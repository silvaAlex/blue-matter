# @blue-matter/core

> A lightweight TypeScript library for reading, parsing, and updating Markdown front matter safely.

[![CI](https://github.com/silvaAlex/blue-matter/actions/workflows/ci.yml/badge.svg)](https://github.com/silvaAlex/blue-matter/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@blue-matter/core)](https://www.npmjs.com/package/@blue-matter/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

`@blue-matter/core` is a utility library for developers building plugins, automation tools, and scripts for Obsidian.

It provides a simple API to read, modify, and write YAML or JSON front matter while preserving the rest of the Markdown document.

## Features

- Fast front matter parsing
- Update metadata without touching Markdown content
- Safe serialization
- YAML and JSON engines
- Extensible engine registry
- TypeScript types included
- Designed for Obsidian plugin development

## Requirements

- Node.js 22.18 or newer

## Installation

```bash
npm install @blue-matter/core
```

or

```bash
pnpm add @blue-matter/core
```

or

```bash
yarn add @blue-matter/core
```

## Usage

### Parse front matter

```ts
import { matter } from "@blue-matter/core";

const markdown = `---
title: My Note
tags:
  - obsidian
  - typescript
---

Hello world!
`;

const file = matter(markdown);

console.log(file.data);
// { title: "My Note", tags: ["obsidian", "typescript"] }

console.log(file.content);
// Hello world!
```

### Update metadata

```ts
import { matter, stringify } from "@blue-matter/core";

const markdown = `---
title: Old title
---

Content
`;

const file = matter(markdown);
const updated = stringify(file, {
  ...file.data,
  title: "New title",
  status: "published"
});

console.log(updated);
```

### Select an engine

YAML is the default engine. JSON front matter can be parsed by setting `language`:

```ts
const file = matter('---\n{"title":"JSON front matter"}\n---\nBody', {
  language: "json"
});
```

## API

### `matter(input, options?)`

Parses a Markdown document and returns a `BlueMatterFile` containing:

- `data`: parsed front matter as `Record<string, unknown>`
- `content`: Markdown content without the front matter block
- `excerpt`, `isEmpty`, `language`, `matter`, and `orig`
- `stringify(data?, options?)`: serializes the file back to Markdown

### `stringify(input, data?, options?)`

Serializes a Markdown string, Buffer, or parsed file with front matter while preserving the document content.

### Additional exports

The package also exports `parseWithEngine`, `normalizeOptions`, `getEngine`, `resolveAlias`, `defaultEngines`, `yamlEngine`, and `jsonEngine`, plus the associated TypeScript types.

## Development

```bash
npm ci
npm run lint
npm test
npm run build
npm pack --dry-run
```

## Publishing

Releases are published to npm by the GitHub Actions workflow when a GitHub Release is published. Configure npm Trusted Publishing for this repository using the `publish.yml` workflow and the `npm` environment. No long-lived npm token is stored in GitHub Actions.

## License

MIT
