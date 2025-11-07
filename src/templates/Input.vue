<script setup lang="ts">
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import InputError from "@/components/InputError.vue"

const model = defineModel<string | number>()

defineProps<{
    name: string
    label?: string
    type?: string
    placeholder?: string
    error?: string | null
    required?: boolean
    autofocus?: boolean
    tabindex?: number
    autocomplete?: string
}>()
</script>

<template>
    <div class="grid gap-2">
        <Label v-if="label" :for="name">{{ label }}</Label>

        <Input :id="name" :name="name" :type="type || 'text'" v-model="model" :placeholder="placeholder"
            :required="required" :autofocus="autofocus" :tabindex="tabindex" :autocomplete="autocomplete" />

        <InputError v-if="error" :message="error" />
    </div>
</template>
