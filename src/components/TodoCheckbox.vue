<template>
  <label class="relative cursor-pointer">
    <input
      v-model="item.isChecked"
      type="checkbox"
      name="checked"
      class="peer sr-only"
    />
    <div class="size-8 rounded-full border-4 border-black peer-checked:border-green-600"></div>
    <CheckIcon
      class="absolute -left-2 -top-4 hidden size-12 stroke-green-600 stroke-2 peer-checked:block"
    />
  </label>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'
import { Todo } from '@/types/Todo'

const item = defineModel<Todo>({ required: true })
</script>
