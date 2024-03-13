<template>
  <button
    :disabled="disabled"
    :class="[textColor, backgroundColor]"
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
defineEmits(['click'])
</script>
