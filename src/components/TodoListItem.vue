<template>
  <div class="rounded-xl border-2 border-black">
    <div class="flex flex-col justify-between gap-10 p-2">
      <div class="flex items-start justify-between">
        <span class="break-all text-3xl font-bold">{{ item.title }}</span>
        <span
          class="select-none rounded-full px-8 py-1 text-xl text-white"
          :class="backgroundColor"
          >{{ item.priority }}</span
        >
      </div>
      <div class="flex items-end justify-between gap-6">
        <span class="break-words text-2xl font-bold text-gray-500">{{ item.description }}</span>
        <TodoCheckbox v-model="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Todo } from '@/types/Todo'
import TodoCheckbox from '@/components/TodoCheckbox.vue'

const item = defineModel<Todo>({ required: true })

const backgroundColorMap = {
  High: 'bg-red-500',
  Medium: 'bg-orange-400',
  Low: 'bg-teal-400'
}

const backgroundColor = computed(() => backgroundColorMap[item.value.priority])
</script>
