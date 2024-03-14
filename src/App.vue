<template>
  <main class="mx-auto my-6 max-w-screen-sm">
    <div class="flex flex-col content-center justify-center gap-12 px-4">
      <TodoHeader @add-todo="addTodo" />
      <TodoListEmpty v-if="isTodoListEmpty" />
      <TodoListItem
        v-for="(item, index) in todoList"
        :key="item.id"
        v-model="todoList[index]"
        @delete-item="deleteItem"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoListEmpty from '@/components/TodoListEmpty.vue'
import TodoListItem from '@/components/TodoListItem.vue'
import { Todo } from '@/types/Todo'

const todoList = ref<Todo[]>([])
const isTodoListEmpty = computed(() => !todoList.value.length)

const counter = ref(0)
// Function that simulates a todo add for testing
function addTodo() {
  const newItem: Todo = {
    id: counter.value++,
    priority: 'Low',
    title: 'New Todo',
    description: 'This is a placeholder text. Click on the card to start editing!',
    isChecked: false,
    date: getDate()
  }
  todoList.value.unshift(newItem)
}

function getDate() {
  const date = new Date()
  const day = String(date.getDay()).padStart(2, '0')
  const month = String(date.getMonth()).padStart(2, '0')
  const year = String(date.getFullYear() % 100).padStart(2, '0')
  return `${day}.${month}.${year}`
}

function deleteItem(id: number) {
  todoList.value = todoList.value.filter((item) => item.id != id)
}
</script>
