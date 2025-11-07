<script setup lang="ts">
import { computed } from "vue"
import { Check, ChevronsUpDown, Search } from "lucide-vue-next"
import { cn } from "@/Utils"
import { Button } from "@/Components/ui/button"
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger,
} from "@/Components/ui"

interface Option {
    value: string
    label: string
}

const props = defineProps<{
    modelValue?: Option | null
    options: Option[]
    placeholder?: string
}>()

const emit = defineEmits(["update:modelValue"])

const value = computed({
    get: () => props.modelValue,
    set: (val: Option | null) => emit("update:modelValue", val),
})
</script>

<template>
    <Combobox v-model="value" by="label">
        <ComboboxAnchor as-child>
            <ComboboxTrigger as-child>
                <Button variant="outline" class="justify-between w-full">
                    {{ value?.label ?? props.placeholder ?? 'Select option' }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxList>
            <div class="relative w-full max-w-sm items-center">
                <ComboboxInput class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
                    :placeholder="props.placeholder ?? 'Search...'" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                    <Search class="size-4 text-muted-foreground" />
                </span>
            </div>

            <ComboboxEmpty>No item found.</ComboboxEmpty>

            <ComboboxGroup>
                <ComboboxItem v-for="option in props.options" :key="option.value" :value="option">
                    {{ option.label }}
                    <ComboboxItemIndicator>
                        <Check :class="cn('ml-auto h-4 w-4')" />
                    </ComboboxItemIndicator>
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox>
</template>
