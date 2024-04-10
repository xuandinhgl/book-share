<script setup lang="ts">
import type {Book} from "~/types";

defineProps<{ book: Book }>()
defineEmits(['remove'])
</script>

<template>
  <div class="flex items-center py-3 border-b border-gray-600">
    <div class="pr-2">
      <img :src="book.image" alt="" width="60" class="h-auto">
    </div>
    <h2 class="pr-2">{{ book.name }}</h2>
    <UButton variant="link"
             @click="$emit('remove',book.id)"
             icon="i-heroicons-x-mark"
             class="ml-auto"
             color="indigo"
    />
  </div>
</template>

<style scoped>

</style>
