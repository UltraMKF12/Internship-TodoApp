<template>
  <div class="flex items-center gap-1">
    <CalendarDaysIcon
      class="hidden size-4 stroke-gray-800 sm:block"
      :class="iconClass"
    />
    <p class="text-sm text-gray-800">{{ date }}</p>
  </div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
interface Props {
  date: string
  iconClass: string
}

defineProps<Props>()
</script>
