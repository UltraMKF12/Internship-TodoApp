<template>
  <section class="rounded-xl border-2 border-black">
    <div class="flex flex-col justify-between gap-10 p-2">
      <div class="flex items-start justify-between">
        <span class="break-all text-3xl font-bold">{{ title }}</span>
        <span
          class="rounded-full px-8 py-1 text-xl text-white"
          :class="backgroundColor"
          >{{ priority }}</span
        >
      </div>
      <div class="flex items-end justify-between gap-6">
        <span class="break-words text-2xl font-bold text-gray-500">{{ description }}</span>
        <label class="relative cursor-pointer">
          <input
            value="checked"
            type="checkbox"
            name="checked"
            class="peer sr-only"
          />
          <div
            class="size-8 rounded-full border-4 border-black peer-checked:border-green-600"
          ></div>
          <CheckIcon
            class="absolute -left-2 -top-4 hidden size-12 stroke-green-600 stroke-2 peer-checked:block"
          />
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'

interface Props {
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
  checked: boolean
}

const props = defineProps<Props>()

const backgroundColor = computed(() => {
  if (props.priority === 'High') {
    return 'bg-red-500'
  } else if (props.priority === 'Medium') {
    return 'bg-orange-400'
  } else {
    return 'bg-teal-400'
  }
})
</script>
