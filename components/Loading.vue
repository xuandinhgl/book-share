<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()
</script>

<template>
  <div v-if="modelValue"
       class="w-full min-h-screen fixed z-50 flex items-center justify-center top-0 left-0 bg-sky-500/75">
    <UIcon name="i-heroicons-arrow-path" class="text-6xl animate-spin	"/>
  </div>
</template>
