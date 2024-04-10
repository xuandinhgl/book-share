<script setup lang="ts">
import type {Book} from "~/types";
import {computed} from "vue";

const props = defineProps<{
  items: Book[],
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'remove', 'submit'])

const isShowCart = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <UModal v-model="isShowCart">
    <div class="p-4">
      <div class="flex">
        <UButton variant="link" @click="isShowCart = false" icon="i-heroicons-x-mark" class="ml-auto" color="lime"/>
      </div>
      <template v-if="items.length < 1">
        <div class="flex items-center">
          <div class="pr-2">
            Oops! The cart is empty
          </div>
        </div>
      </template>
      <template v-else>
        <h2 class="text-2xl font-bold text-gray-200">Cart</h2>
        <div class="border-t border-gray-600">
          <CartRow v-for="book in items" :key="book.id" :book="book" @remove="emit('remove', book.id)"/>
        </div>
        <div class="pt-3">
          <UButton @click="$emit('submit')" color="yellow">Submit</UButton>
        </div>
      </template>
    </div>
  </UModal>
</template>

<style scoped>

</style>
