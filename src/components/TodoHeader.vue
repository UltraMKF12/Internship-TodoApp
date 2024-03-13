<template>
  <div class="flex justify-between">
    <h1 class="text-7xl font-bold">To do List</h1>
    <PlusCircleIcon @click="$emit('addTodo')" class="h-16 w-16 text-green-400 cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
defineEmits(['addTodo'])
</script>
