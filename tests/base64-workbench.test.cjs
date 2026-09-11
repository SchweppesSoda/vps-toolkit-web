const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const page = readFileSync(resolve(__dirname, '../site/tools/base64-workbench/index.html'), 'utf8');
const script = page.match(/<script>([\s\S]*?)<\/script>/)[1];

function workbench() {
  const elements = new Map();
  const downloads = [];
  const element = id => {
    if (!elements.has(id)) elements.set(id, {
      value: '', checked: false, textContent: '', className: '', handlers: {},
      addEventListener(event, callback) { this.handlers[event] = callback; },
    });
    return elements.get(id);
  };
  runInNewContext(script, {
    Uint8Array, TextEncoder, TextDecoder, Blob,
    URL: { createObjectURL(blob) { downloads.push(blob); return 'blob:test'; }, revokeObjectURL() {} },
    document: {
      getElementById: element,
      body: { appendChild() {} },
      createElement() { return { click() {}, remove() {} }; },
    },
  });
  for (const [id, value] of Object.entries({ inputMode: 'text', outputMode: 'text', encodePreset: 'standard', decodePreset: 'standard' })) element(id).value = value;
  for (const id of ['stripDataUrl', 'ignoreWhitespace', 'fixPadding']) element(id).checked = true;
  return { element, downloads, fire(id, event = 'click') { return element(id).handlers[event](); } };
}

test('Unicode encoding and decoding round-trip', () => {
  const ui = workbench();
  const sample = 'Hello 世界 🌍';
  ui.element('inputText').value = sample;
  ui.fire('encodeBtn');
  assert.equal(ui.element('outputText').value, Buffer.from(sample).toString('base64'));
  ui.element('inputText').value = ui.element('outputText').value;
  ui.fire('decodeBtn');
  assert.equal(ui.element('outputText').value, sample);
  assert.equal(ui.element('status').className, 'status ok');
});

test('invalid UTF-8 keeps its error and preserves binary download', async () => {
  const ui = workbench();
  ui.element('inputText').value = '/w==';
  ui.fire('decodeBtn');
  assert.equal(ui.element('outputText').value, 'ff');
  assert.equal(ui.element('status').className, 'status error');
  assert.match(ui.element('status').textContent, /not valid UTF-8/);
  ui.fire('downloadBtn');
  assert.deepEqual([...new Uint8Array(await ui.downloads[0].arrayBuffer())], [255]);
});

test('switching binary output to text preserves the fallback error', () => {
  const ui = workbench();
  ui.element('inputText').value = '/w==';
  ui.element('outputMode').value = 'hex';
  ui.fire('decodeBtn');
  assert.equal(ui.element('status').className, 'status ok');
  ui.element('outputMode').value = 'text';
  ui.fire('outputMode', 'change');
  assert.equal(ui.element('status').className, 'status error');
  assert.equal(ui.element('outputText').value, 'ff');
  ui.element('outputMode').value = 'base64';
  ui.fire('outputMode', 'change');
  assert.equal(ui.element('outputText').value, '/w==');
  assert.equal(ui.element('status').className, 'status ok');
});

test('swap updates downloadable output instead of exporting previous bytes', async () => {
  const ui = workbench();
  ui.element('inputText').value = 'Hello 世界';
  ui.fire('encodeBtn');
  ui.fire('swapBtn');
  ui.fire('downloadBtn');
  assert.equal(await ui.downloads[0].text(), ui.element('outputText').value);
  assert.equal(await ui.downloads[0].text(), 'Hello 世界');
});

test('manual output edits update downloads and empty edits prevent stale export', async () => {
  const ui = workbench();
  ui.element('inputText').value = 'old';
  ui.fire('encodeBtn');
  ui.element('outputText').value = 'new 世界';
  ui.fire('outputText', 'input');
  ui.fire('downloadBtn');
  assert.equal(await ui.downloads[0].text(), 'new 世界');
  ui.element('outputText').value = '';
  ui.fire('outputText', 'input');
  ui.fire('downloadBtn');
  assert.equal(ui.downloads.length, 1);
  assert.match(ui.element('status').textContent, /Nothing to download/);
});

test('clear prevents a stale download', () => {
  const ui = workbench();
  ui.element('inputText').value = 'old';
  ui.fire('encodeBtn');
  ui.fire('clearBtn');
  ui.fire('downloadBtn');
  assert.equal(ui.downloads.length, 0);
});
