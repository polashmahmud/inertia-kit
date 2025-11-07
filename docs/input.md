# Input Component

The `Input` template provides a Shadcn-styled text field that wraps the core `Label`, `Input`, and `InputError` building blocks. This component handles labeling, validation feedback, and two-way binding so you can drop it straight into form-centric Inertia views.

## When to Use

- Collecting short textual or numeric data in resource forms.
- Displaying server-side validation errors directly beneath the field.
- Maintaining consistent spacing and typography across form layouts.

## Basic Example

```vue
<script setup lang="ts">
import Input from "@/components/blocks/Input.vue";

const form = reactive({
  email: "",
});
</script>

<template>
  <form class="space-y-4">
    <Input
      v-model="form.email"
      name="email"
      label="Email address"
      type="email"
      placeholder="you@example.com"
      autocomplete="email"
      required
    />
  </form>
</template>
```

## Props

| Prop           | Type             | Default     | Description                                                             |
| -------------- | ---------------- | ----------- | ----------------------------------------------------------------------- |
| `name`         | `string`         | —           | Unique identifier used for both the input `id` and submission key.      |
| `label`        | `string`         | `undefined` | Optional text rendered via Shadcn `Label`. Hidden when omitted.         |
| `type`         | `string`         | `'text'`    | Standard HTML input type (`text`, `email`, `password`, etc.).           |
| `placeholder`  | `string`         | `undefined` | Helper copy that appears inside the field before typing.                |
| `error`        | `string \| null` | `null`      | Validation message surfaced through `InputError`. Pass `null` to clear. |
| `required`     | `boolean`        | `false`     | Adds the `required` attribute and enforces native validation.           |
| `autofocus`    | `boolean`        | `false`     | Automatically focuses the field when the component mounts.              |
| `tabindex`     | `number`         | `undefined` | Allows tab order adjustments for custom flows.                          |
| `autocomplete` | `string`         | `undefined` | Maps to the native `autocomplete` attribute for browser hints.          |

## Validation Feedback

Pass the `error` prop with the message returned from your Inertia form response. The component automatically switches to the configured Shadcn error style:

```vue
<Input
  v-model="form.password"
  name="password"
  label="Password"
  type="password"
  :error="form.errors.password"
/>
```

## Accessibility Notes

- The generated `Label` references the input `id`, ensuring screen readers announce the label text.
- Error messages render immediately after the field to comply with WCAG guidance on validation feedback.
- You can rely on Shadcn defaults for contrast and focus outlines, keeping the component keyboard-friendly.
