<template>
  <main class="mx-auto my-6 max-w-screen-sm">
    <div class="flex flex-col content-center justify-center gap-12 px-4">
      <TodoHeader @add-todo="addTodo" />
      <TodoListEmpty v-if="isTodoListEmpty" />
      <TodoListItem
        v-for="item in todoList"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :priority="item.priority"
        :checked="item.checked"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoListEmpty from '@/components/TodoListEmpty.vue'
import TodoListItem from '@/components/TodoListItem.vue'
import type Todo from '@/types/Todo'

const todoList = ref<Todo[]>([])
const isTodoListEmpty = computed(() => !todoList.value.length)

// Function that simulates a todo add for testing
function addTodo() {
  let priorities = ['High', 'Medium', 'Low']
  let randomPriority = priorities[Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low'
  let newItem: Todo = {
    id: todoList.value.length,
    priority: randomPriority,
    title: 'Test Title',
    description: 'This is a test description to check the',
    checked: Boolean(Math.round(Math.random()))
  }
  todoList.value.push(newItem)
}
</script>
