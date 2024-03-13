<template>
  <button></button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  disabled: boolean
  textColor: string
  backgroundColor: string
  buttonText: string
}

defineProps<Props>()
defineEmits(['click'])
</script>
