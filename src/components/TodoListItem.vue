<template>
  <div class="relative rounded-xl border-2 border-black">
    <div
      class="flex flex-col justify-between p-4"
      @click="enterEditMode"
    >
      <div class="flex items-start justify-between">
        <span
          ref="titleHTML"
          class="break-all text-3xl font-bold"
          :contenteditable="isEditMode"
          >{{ item.title }}</span
        >
        <div
          v-if="!isPriorityChange"
          class="relative select-none rounded-full py-1 text-center text-xl"
          :class="[backgroundColor, priorityBoxSize]"
          @click="openPriorityChange"
        >
          <span>{{ item.priority }}</span>
          <span
            v-if="isEditMode"
            class="text-xl text-white"
          >
            <span class="absolute right-1 translate-y-[-0.55rem] select-none text-2xl">⌄</span>
          </span>
        </div>
        <TodoPriorityDropdown
          v-else
          v-model="item"
          @changed-priority="closePriorityChange"
        />
      </div>
      <TodoCalendar
        :date="item.date"
        class="mb-4 mt-2"
      />
      <div class="flex max-w-[90%] items-end justify-between gap-6">
        <span
          ref="descriptionHTML"
          class="break-words text-2xl font-bold"
          :class="[textColor]"
          :contenteditable="isEditMode"
          >{{ item.description }}</span
        >
      </div>
    </div>
    <div
      v-if="isEditMode"
      class="flex items-end gap-2 pb-4 pl-4 pt-4"
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
import TodoPriorityDropdown from '@/components/TodoPriorityDropdown.vue'

const item = defineModel<Todo>({ required: true })
const isEditMode = ref(false)
const isPriorityChange = ref(false)

const backgroundColorMap = {
  High: 'bg-red-500',
  Medium: 'bg-orange-400',
  Low: 'bg-teal-400'
}

const titleHTML = ref<HTMLSpanElement | null>()
const descriptionHTML = ref<HTMLSpanElement | null>()
const backgroundColor = computed(() => backgroundColorMap[item.value.priority])
const textColor = computed(() => {
  if (isEditMode.value) {
    return 'text-black'
  } else {
    return 'text-gray-500'
  }
})
const priorityBoxSize = computed(() => {
  if (isEditMode.value) {
    return 'w-36'
  } else {
    return 'px-8'
  }
})

function enterEditMode() {
  isEditMode.value = true
}

function leaveEditMode() {
  isEditMode.value = false
  isPriorityChange.value = false
  item.value.title = titleHTML.value?.textContent
  item.value.description = descriptionHTML.value?.textContent

  // If the user deletes all text reset them to a default
  if (item.value.title === '') {
    item.value.title = 'Title'
  }
  if (item.value.description === '') {
    item.value.description = 'Description'
  }
}

function openPriorityChange() {
  if (isEditMode.value) {
    isPriorityChange.value = true
  }
}

function closePriorityChange() {
  isPriorityChange.value = false
}
</script>
