<template>
  <div class="relative rounded-xl border-2 border-black">
    <div
      class="flex flex-col justify-between p-4"
      @click="enterEditMode"
    >
      <div class="flex items-start justify-between">
        <span class="break-all text-3xl font-bold">{{ item.title }}</span>
        <span
          class="select-none rounded-full px-8 py-1 text-xl text-white"
          :class="backgroundColor"
          >{{ item.priority }}</span
        >
      </div>
      <TodoCalendar
        :date="item.date"
        class="mb-4 mt-2"
      />
      <div class="flex max-w-[90%] items-end justify-between gap-6">
        <span
          class="break-words text-2xl font-bold"
          :class="[textColor]"
          >{{ item.description }}</span
        >
      </div>
    </div>
    <div
      v-if="isEditMode"
      class="flex items-end gap-2 pb-4 pl-4"
    >
      <BaseButton
        :disabled="false"
        text-color="text-white"
        background-color="bg-green-500"
        button-text="Save"
        @click="leaveEditMode"
      />
      <BaseButton
        :disabled="false"
        text-color="text-black"
        background-color="bg-gray-300"
        button-text="Delete"
      />
    </div>
    <div
      v-if="!isEditMode"
      class="absolute right-2 -translate-y-10"
    >
      <TodoCheckbox v-model="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo } from '@/types/Todo'
import TodoCheckbox from '@/components/TodoCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import TodoCalendar from '@/components/TodoCalendar.vue'

const item = defineModel<Todo>({ required: true })
const isEditMode = ref(false)

const backgroundColorMap = {
  High: 'bg-red-500',
  Medium: 'bg-orange-400',
  Low: 'bg-teal-400'
}

const backgroundColor = computed(() => backgroundColorMap[item.value.priority])
const textColor = computed(() => {
  if (isEditMode.value) {
    return 'text-black'
  } else {
    return 'text-gray-500'
  }
})

function enterEditMode() {
  isEditMode.value = true
}

function leaveEditMode() {
  isEditMode.value = false
}
</script>
