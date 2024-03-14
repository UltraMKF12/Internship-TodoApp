<template>
  <div class="flex items-center gap-1">
    <CalendarDaysIcon class="size-4 stroke-gray-800" />
    <p class="text-sm text-gray-800">{{ date }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  date: string
}

defineProps<Props>()
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
</script>
