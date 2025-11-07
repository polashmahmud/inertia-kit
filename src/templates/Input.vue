<script setup lang="ts">
import { computed } from "vue"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { InputError } from "@/Components/ui/input-error"

interface Props {
    modelValue?: string | number | null
    name: string
    label?: string
    type?: string
    placeholder?: string
    error?: string | null
    required?: boolean
    autofocus?: boolean
    tabindex?: number
    autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    label: "",
    placeholder: "",
    required: false,
    autofocus: false,
    tabindex: 0,
    autocomplete: "",
})

const emit = defineEmits(["update:modelValue", "change"])

const value = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit("update:modelValue", val)
        emit("change", val)
    },
})
</script>

<template>
    <div class="grid gap-2">
        <Label v-if="label" :for="name">{{ label }}</Label>

        <Input :id="name" :name="name" :type="type" :value="value" :placeholder="placeholder" :required="required"
            :autofocus="autofocus" :tabindex="tabindex" :autocomplete="autocomplete"
            @input="value = $event.target.value" />

        <InputError v-if="error" :message="error" />
    </div>
</template>
