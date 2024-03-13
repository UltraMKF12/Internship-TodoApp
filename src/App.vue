<template>
  <div class="m-auto my-6 flex max-w-screen-md flex-col content-center justify-center">
    <TodoHeader />
    <TodoListEmpty v-if="isTodoListEmpty" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoListEmpty from './components/TodoListEmpty.vue'

interface Todo {
  id: number
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
}

const todoList = ref<Todo[]>([])
const isTodoListEmpty = computed(() => !todoList.value.length)
</script>
