<template>
  <div class="flex justify-between">
    <h1 class="text-7xl font-bold">To do List</h1>
    <PlusCircleIcon
      class="w -16 h-16 cursor-pointer text-green-400"
      @click="addTodo"
    />
  </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['addTodo'])

function addTodo() {
  emit('addTodo')
}
</script>
