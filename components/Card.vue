<script setup lang="ts">
import type {Book} from "~/types";

defineProps<{
  book: Book
}>();

defineEmits(["onSelect"]);
const ui = {
  body: {
    padding: "p-0 sm:p-0 h-full"
  }
};
</script>

<template>
  <UCard class="overflow-hidden" :ui="ui">
    <div class="flex flex-col h-full">
      <div class="w-full pb-40" :style="{ 'background-image': `url(${book.image})` }" />
      <div class="px-5 py-4 flex flex-col flex-1">
        <h2 class="pb-2 text-xl">{{ book.name }}</h2>
        <p class="line-clamp-3">{{ book.description }}</p>
        <p class="pt-2 mt-auto">
          <UButton color="amber" variant="solid" block @click="$emit('onSelect', book.id)">Select</UButton>
        </p>
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
