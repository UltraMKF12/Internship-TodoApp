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
            v-if="!isEditMode"
            class="line-clamp-1 text-2xl font-bold text-black sm:text-3xl"
            :class="[priorityDropdownFilter]"
            >{{ item.title }}</span
          >
          <input
            v-else
            v-model="item.title"
            type="text"
            class="w-[90%] truncate break-words text-2xl font-bold text-black sm:w-[100%] sm:text-3xl"
            :class="[priorityDropdownFilter]"
          />
          <TodoCalendar
            :date="item.date"
            class="sm:mb-4 sm:mt-2"
            :class="[priorityDropdownButtonFilter]"
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
          <ChevronDownIcon
            v-if="isEditMode"
            class="absolute right-2 top-1/4 size-5 fill-black"
          />
        </div>
        <TodoPriorityDropdown
          v-else
          v-model="item"
          class="hidden sm:block"
          @changed-priority="closePriorityChange"
        />
      </div>

      <!-- Description -->
      <div class="flex max-w-[90%] items-end justify-between gap-6">
        <span
          v-if="!isEditMode"
          class="hidden text-xl font-bold sm:line-clamp-3 sm:text-2xl"
          :class="[textColor, priorityDropdownFilter, mobileForceDisplayClass]"
        >
          {{ item.description }}</span
        >
        <textarea
          v-else
          v-model="item.description"
          class="hidden h-20 w-[100%] break-words text-xl font-bold sm:block sm:h-32 sm:text-2xl"
          :class="[textColor, priorityDropdownFilter, mobileForceDisplayClass]"
        />
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
      <TodoDeleModalComponenet
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
import TodoDeleModalComponenet from '@/components/TodoDeleModalComponenet.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

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

const backgroundColor = computed(() => backgroundColorMap[item.value.priority])

const textColor = computed(() => (isEditMode.value ? 'text-black' : 'text-gray-500'))
const priorityBoxSize = computed(() => (isEditMode.value ? 'w-36' : 'px-8'))

const priorityDropdownFilter = computed(() =>
  isPriorityChange.value ? 'text-opacity-40 select-none' : ''
)

const priorityDropdownButtonFilter = computed(() =>
  isPriorityChange.value ? 'opacity-40 hover:opacity-40 active:opacity-40 select-none' : ''
)

const mobileEditModeMargin = computed(() => (isEditMode.value ? '' : 'pl-24'))
const mobileForceDisplayClass = computed(() => (isEditMode.value ? '!block' : ''))

function enterEditMode() {
  isEditMode.value = true
}

function leaveEditMode() {
  isEditMode.value = false
  isPriorityChange.value = false

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
