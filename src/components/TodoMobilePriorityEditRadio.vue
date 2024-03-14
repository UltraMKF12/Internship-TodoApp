<template>
  <label>
    <input
      v-model="item.priority"
      type="radio"
      :value="priority"
      class="peer sr-only" />
    <div
      class="size-3 shrink-0 cursor-pointer rounded-full peer-checked:ring-2 peer-checked:ring-black"
      :class="props.color"
    ></div
  ></label>
</template>

<script setup lang="ts">
import { Todo, Priority } from '@/types/Todo'
interface Props {
  color: string
  priority: Priority
}

const props = defineProps<Props>()
const item = defineModel<Todo>({ required: true })
</script>
