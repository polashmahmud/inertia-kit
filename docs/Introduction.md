# Introduction

`@polashmahmud/inertia-kit` is a CLI and template library that drops Shadcn-styled Vue components into any Inertia.js project within seconds. This guide walks you through installing the tool, generating your first component, and wiring it into a page.

## Prerequisites

- Existing Inertia.js + Vue project (Vite or Laravel Mix works great)
- Node.js 18 or newer
- npm or yarn

## Installation

Install locally so you can run the CLI via `npx`:

```bash
npm install @polashmahmud/inertia-kit --save-dev
```

Prefer a global CLI? Install it once and call it directly:

```bash
npm install -g @polashmahmud/inertia-kit
```

## Generate Your First Component

1. Check which templates ship with the kit:
   ```bash
   npx inertia-kit list
   ```
2. Scaffold the component you want (for example, the `Input` component):
   ```bash
   npx inertia-kit add Input
   ```
3. By default the file lands in `resources/js/Components/blocks`. Point it somewhere else with `--dest`:
   ```bash
   npx inertia-kit add Input --dest resources/js/Components/forms
   ```
4. Pass `--overwrite` if you need to replace an existing file.

The CLI asks for a component instance name and uses it for the generated Vue filename (for example `Input.vue`).

## Use in Your Project

Import the generated component inside any Vue page or layout:

```vue
<script setup lang="ts">
import Input from "@/Components/blocks/Input.vue";

const form = reactive({
  email: "",
  errors: {},
});
</script>

<template>
  <form class="space-y-4">
    <Input
      v-model="form.email"
      name="email"
      label="Email address"
      type="email"
      :error="form.errors.email"
      placeholder="you@example.com"
      required
    />
  </form>
</template>
```

All templates follow Shadcn design conventions, so they blend seamlessly with Tailwind-based stylesheets.

## Next Steps

- Read `docs/input.md` for a deep dive into the Input component.
- Add your own templates under `src/templates` and update `index.json` to expose them through the CLI.
- Track release notes and examples on GitHub: https://github.com/polashmahmud/inertia-kit
