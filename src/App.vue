<template>
  <main class="mx-auto my-6 max-w-screen-sm">
    <div class="flex flex-col content-center justify-center gap-12 px-4">
      <TodoHeader @add-todo="addTodo" />
      <TodoListEmpty v-if="isTodoListEmpty" />
      <TodoListItem
        v-for="(item, index) in todoList"
        :key="item.id"
        v-model="todoList[index]"
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

// Function that simulates a todo add for testing
function addTodo() {
  const newItem: Todo = {
    id: todoList.value.length,
    priority: 'Low',
    title: 'New Todo',
    description: 'This is a placeholder text. Click on the card to start editing!',
    isChecked: false
  }
  todoList.value.unshift(newItem)
}
</script>
