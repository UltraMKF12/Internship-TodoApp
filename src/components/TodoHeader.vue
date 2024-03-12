<script setup lang="ts">
import PlusSymbol from './icons/plus_icon.vue'
defineEmits(['addTodo'])
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-7xl font-bold">To do List</h1>
    <button @click="$emit('addTodo')">
      <PlusSymbol />
    </button>
  </div>
</template>
