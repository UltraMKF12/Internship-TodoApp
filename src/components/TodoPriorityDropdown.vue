<template>
  <div
    class="relative w-36 shrink-0 select-none rounded-full border-2 border-black bg-white py-[0.1rem] text-center"
  >
    <span class="text-xl text-black">
      {{ item.priority }}
      <ChevronDownIcon class="absolute right-2 top-1/4 size-5 fill-black" />
    </span>
    <div
      class="absolute box-border w-36 translate-y-4 select-none rounded-xl border-2 border-black bg-white text-center"
    >
      <div class="flex flex-col text-xl">
        <span
          v-for="(priorityText, index) in priorities"
          :key="index"
          class="hover:bg-gray-200"
          :class="borderClass[index]"
          @click="changePriority(priorityText)"
          >{{ priorityText }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo, Priority } from '@/types/Todo'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const emit = defineEmits(['changedPriority'])
const item = defineModel<Todo>({ required: true })

const priorities = ref<Priority[]>(['Low', 'Medium', 'High'])
const borderClass = ref(['rounded-t-lg', '', 'rounded-b-lg'])

function changePriority(newPriority: Priority) {
  item.value.priority = newPriority
  emit('changedPriority')
}
</script>
