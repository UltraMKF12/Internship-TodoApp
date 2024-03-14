<template>
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold sm:text-7xl">To do List</h1>
    <PlusCircleIcon
      class="size-16 cursor-pointer text-green-400"
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
