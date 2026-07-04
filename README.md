# blue-matter

> A lightweight TypeScript library for reading, parsing, and updating Obsidian frontmatter safely.

## Overview

`blue-matter` is a utility library designed for developers building plugins, automation tools, and scripts for Obsidian.

It provides a simple API to read, modify, and write YAML frontmatter while preserving the rest of the Markdown document.

## Features

- ⚡ Fast frontmatter parsing
- 📝 Update YAML metadata without touching Markdown content
- 🔒 Safe serialization
- 📦 Zero unnecessary complexity
- 💙 Built with TypeScript
- 🧩 Designed for Obsidian plugin development

## Installation

```bash
npm install blue-matter
```

or

```bash
pnpm add blue-matter
```

or

```bash
yarn add blue-matter
```

---

## Example

### Parse frontmatter

```ts
import { parse } from "blue-matter";

const markdown = `
---
title: My Note
tags:
  - obsidian
  - typescript
---

Hello world!
`;

const result = parse(markdown);

console.log(result.data);
// {
//   title: "My Note",
//   tags: ["obsidian", "typescript"]
// }

console.log(result.content);
// Hello world!
```

---

### Update metadata

```ts
import { stringify } from "blue-matter";

const markdown = `
---
title: Old title
---

Content
`;

const updated = stringify(markdown, {
  title: "New title",
  status: "published"
});

console.log(updated);
```

---

## Use Cases

- Obsidian plugins
- Static note processing
- Vault automation
- Markdown tooling
- Metadata migration
- Batch editing

## API

### `parse(markdown: string)`

Extracts YAML frontmatter and returns:

```ts
{
  data: Record<string, unknown>;
  content: string;
}
```

---

### `stringify(markdown, data)`

Replaces or creates frontmatter while preserving Markdown content.

Returns:

```ts
string
```

---

## Why blue-matter?

Most frontmatter libraries are generic. `blue-matter` focuses on the needs of Obsidian developers:

- predictable behavior
- clean TypeScript API
- Markdown-first design
- easy integration with Obsidian plugins

## License

MIT
