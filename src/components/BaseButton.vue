<template>
  <button
    :disabled="disabled"
    :class="[textColor, backgroundColor]"
    class="rounded-xl px-6 py-2 hover:opacity-85 active:opacity-60 sm:px-8 sm:py-3"
    @click="emit('click')"
  >
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled: boolean
  textColor: string
  backgroundColor: string
  buttonText: string
}

defineProps<Props>()
const emit = defineEmits(['click'])
</script>
