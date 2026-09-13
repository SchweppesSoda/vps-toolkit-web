const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');
const html = readFileSync(resolve(__dirname, '../site/tools/argosbx-argo-batch/argosbx_argo_batch.html'), 'utf8');
const script = html.slice(html.indexOf('// 校验：'), html.indexOf('function setPort'));
function fixture(fetcher) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { value: '', textContent: '', innerHTML: '', disabled: false, addEventListener() {} });
    return elements.get(id);
  };
  element('releaseFile').value = 'hosts.txt';
  const context = { $: element, SOURCES: [{ name: 'fixture', build() { return 'https://fixture.invalid/'; } }],
    RELEASE_BASE: 'https://fixture.invalid/', fetchWithTimeout: fetcher, Date,
    FileReader: class { readAsText() { this.onload({ target: { result: 'example.com' } }); } } };
  runInNewContext(script, context);
  return { context, element };
}
const attack = '<img src=x onerror="alert(1)">';
test('provider response and thrown error are rendered as text', async () => {
  for (const fetcher of [async () => ({ ok: true, text: async () => attack }), async () => { throw new Error(attack); }]) {
    const ui = fixture(fetcher);
    await ui.context.fetchList();
    const output = ui.element('meta').innerHTML;
    assert.ok(!output.includes(attack));
    assert.match(output, /&lt;img/);
    assert.match(output, /&quot;alert\(1\)&quot;/);
    assert.equal(ui.element('fetchBtn').disabled, false);
  }
});
test('uploaded filenames cannot introduce markup', () => {
  const ui = fixture();
  ui.context.handleUpload({ target: { files: [{ name: attack + '&.txt' }] } });
  assert.ok(!ui.element('meta').innerHTML.includes(attack));
  assert.match(ui.element('meta').innerHTML, /&lt;img.*&amp;\.txt/);
  assert.equal(ui.element('hosts').value, 'example.com');
});
test('successful fetch retains the host list and status formatting', async () => {
  const ui = fixture(async () => ({ ok: true, text: async () => 'example.com\nexample.net' }));
  await ui.context.fetchList();
  assert.equal(ui.element('hosts').value, 'example.com\nexample.net');
  assert.match(ui.element('meta').innerHTML, /<span class="ok">.*2 行/);
});
