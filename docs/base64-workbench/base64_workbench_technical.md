# Base64 Workbench Technical Notes

## Purpose

Base64 Workbench is a static, local-first encoder and decoder published at
`site/tools/base64-workbench/`. It performs all processing in the browser and
does not send input or output to a server.

## Supported Workflows

- Encode text, hexadecimal input, or existing Base64 bytes.
- Decode standard Base64 and non-standard variants.
- Normalize URL-safe, bcrypt, crypt, and custom 64-character alphabets.
- Repair missing padding, ignore whitespace, optionally filter invalid
  characters, and strip Data URL prefixes.
- Render decoded output as text, hexadecimal, or Base64.
- Copy or download generated output.

## Implementation

The tool is intentionally delivered as a single `index.html` file with inline
CSS and JavaScript. It has no build step, runtime dependencies, external
requests, cookies, or persistent storage.

## Validation

Open `site/tools/base64-workbench/index.html` directly and check:

1. Standard Base64 text encode/decode round trips.
2. URL-safe input with missing padding decodes correctly.
3. The bundled sample exercises Data URL removal, whitespace cleanup, and
   URL-safe normalization.
4. Copy and download actions work in a supported browser.
5. Both the two-column desktop layout and single-column mobile layout remain
   usable.
