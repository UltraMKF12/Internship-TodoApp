<template>
  <div class="flex scale-[.75] select-none flex-col items-center justify-center sm:scale-100">
    <NoTodoImage />
    <p class="whitespace-nowrap text-4xl font-bold text-gray-400">You have no todos yet</p>
  </div>
</template>

<script setup lang="ts">
import NoTodoImage from '@/components/icons/NoTodoImage.vue'
</script>
