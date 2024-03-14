<template>
  <div class="fixed left-0 top-0 flex size-full items-center justify-center bg-black bg-opacity-25">
    <div class="flex w-[400px] flex-col gap-4 rounded-xl border-2 border-black bg-gray-100 p-2">
      <p class="text-center text-2xl">
        Are you sure you want to delete this Todo?<TrashIcon class="inline size-6 -translate-y-1" />
      </p>
      <div class="flex justify-center gap-4">
        <BaseButton
          :disabled="false"
          text-color="text-black"
          background-color="bg-gray-300"
          button-text="Yes"
          @click="emit('delete')"
        ></BaseButton>
        <BaseButton
          :disabled="false"
          text-color="text-black"
          background-color="bg-red-500"
          button-text="No"
          @click="emit('close')"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['delete', 'close'])
</script>
