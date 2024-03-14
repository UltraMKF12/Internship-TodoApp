<template>
  <div
    class="relative w-36 shrink-0 select-none rounded-full border-2 border-black bg-white py-[0.1rem] text-center"
  >
    <span class="text-xl text-black">
      {{ item.priority }}
      <span class="absolute right-1 translate-y-[-0.55rem] select-none text-2xl">⌄</span>
    </span>
    <div
      class="absolute box-border w-36 translate-y-4 select-none rounded-xl border-2 border-black bg-white text-center"
    >
      <div class="flex flex-col text-xl">
        <span
          class="rounded-t-lg hover:bg-gray-200"
          @click="changePriority('Low')"
          >Low</span
        >
        <span
          class="hover:bg-gray-200"
          @click="changePriority('Medium')"
          >Medium</span
        >
        <span
          class="rounded-b-lg hover:bg-gray-200"
          @click="changePriority('High')"
          >High</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo, Priority } from '@/types/Todo'

const emit = defineEmits(['changedPriority'])

const item = defineModel<Todo>({ required: true })

function changePriority(newPriority: Priority) {
  item.value.priority = newPriority
  emit('changedPriority')
}
</script>
