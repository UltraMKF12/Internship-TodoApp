<template>
  <div class="relative rounded-xl border-2 border-black">
    <div
      class="flex flex-col justify-between p-4 sm:p-4"
      :class="mobileEditModeMargin"
      @click="enterEditMode"
    >
      <!-- Title and Date Calendar -->
      <div class="flex items-center justify-between sm:items-start">
        <div class="flex flex-col">
          <span
            ref="titleHTML"
            class="break-words text-3xl font-bold text-black"
            :class="[priorityDropdownFilter]"
            :contenteditable="isEditMode && !isPriorityChange"
            >{{ item.title }}</span
          >
          <TodoCalendar
            :date="item.date"
            class="sm:mb-4 sm:mt-2"
            :icon-class="mobileForceDisplayClass"
          />
        </div>

        <!-- Mobile Mode Priority -->
        <div class="sm:hidden">
          <div
            v-if="!isEditMode"
            class="size-3 shrink-0 rounded-full"
            :class="backgroundColor"
          ></div>
          <div
            v-else
            class="flex gap-1"
          >
            <TodoMobilePriorityEditRadio
              v-model="item"
              color="bg-teal-400"
              priority="Low"
            />
            <TodoMobilePriorityEditRadio
              v-model="item"
              color="bg-orange-400"
              priority="Medium"
            />
            <TodoMobilePriorityEditRadio
              v-model="item"
              color="bg-red-500"
              priority="High"
            />
          </div>
        </div>

        <!-- Desktop Mode Priority -->
        <div
          v-if="!isPriorityChange"
          class="relative hidden shrink-0 select-none rounded-full py-1 text-center text-xl sm:block"
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

      <!-- Description -->
      <div class="flex max-w-[90%] items-end justify-between gap-6">
        <span
          ref="descriptionHTML"
          class="hidden break-words text-2xl font-bold sm:block"
          :class="[textColor, priorityDropdownFilter, mobileForceDisplayClass]"
          :contenteditable="isEditMode && !isPriorityChange"
          >{{ item.description }}</span
        >
      </div>
    </div>

    <!-- Save and Delete Buttons -->
    <div
      v-if="isEditMode"
      class="flex items-end gap-2 pb-4 pl-4 pt-4"
    >
      <BaseButton
        :disabled="isPriorityChange"
        text-color="text-white"
        background-color="bg-green-500"
        button-text="Save"
        :class="priorityDropdownButtonFilter"
        @click="leaveEditMode"
      />
      <BaseButton
        :disabled="isPriorityChange"
        text-color="text-black"
        background-color="bg-gray-300"
        button-text="Delete"
        :class="priorityDropdownButtonFilter"
        @click="openDeleteWindow"
      />
    </div>

    <!-- Checkbox -->
    <div
      v-if="!isEditMode"
      class="absolute left-7 top-[35%] sm:left-[91%] sm:top-full sm:-translate-y-12"
    >
      <TodoCheckbox v-model="item" />
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport
      v-if="isDeleteWindow"
      to="body"
    >
      <TodoDeleteModal
        @close="closeDeleteWindow"
        @delete="deleteItem"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo } from '@/types/Todo'
import TodoCheckbox from '@/components/TodoCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import TodoCalendar from '@/components/TodoCalendar.vue'
import TodoPriorityDropdown from '@/components/TodoPriorityDropdown.vue'
import TodoMobilePriorityEditRadio from '@/components/TodoMobilePriorityEditRadio.vue'
import TodoDeleteModal from '@/components/TodoDeleteModal.vue'

const item = defineModel<Todo>({ required: true })
const emit = defineEmits<{
  deleteItem: [id: number]
}>()
const isEditMode = ref(false)
const isPriorityChange = ref(false)
const isDeleteWindow = ref(false)

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

const priorityDropdownFilter = computed(() => {
  if (isPriorityChange.value) {
    return 'text-opacity-40 select-none'
  } else {
    return ''
  }
})

const priorityDropdownButtonFilter = computed(() => {
  if (isPriorityChange.value) {
    return 'opacity-40 hover:opacity-40 active:opacity-40 select-none'
  } else {
    return ''
  }
})

const mobileEditModeMargin = computed(() => {
  if (isEditMode.value) {
    return ''
  } else {
    return 'pl-24'
  }
})

const mobileForceDisplayClass = computed(() => {
  if (isEditMode.value) {
    return '!block'
  } else return ''
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

function openDeleteWindow() {
  isDeleteWindow.value = true
}

function closeDeleteWindow() {
  isDeleteWindow.value = false
}

function deleteItem() {
  closeDeleteWindow()
  emit('deleteItem', item.value.id)
}
</script>
