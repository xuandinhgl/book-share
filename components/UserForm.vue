<script setup lang="ts">
import {computed} from "vue";
import type {FormSubmitEvent} from '#ui/types';
import {type InferType, object, string, date} from "yup";
import type {User} from "~/types";

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const isShowForm = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const getToDate = () => {
  const d = new Date()

  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
}

const schema = object({
  name: string().required('Required'),
  phone: string()
      .min(8, 'Must be at least 10 characters')
      .required('Required'),
  date: date()
      .required('Required').min(new Date(), `Date must later than ${getToDate()}`)
})

type Schema = InferType<typeof schema>

const state = reactive<User>({
  name: "",
  phone: "",
  facebook: "",
  date: null
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isShowForm.value = false
  emit('submit', event.data)
}
</script>

<template>
  <UModal v-model="isShowForm">
    <div class="p-4">
      <div class="flex">
        <UButton variant="link" @click="isShowForm = false" icon="i-heroicons-x-mark" class="ml-auto" color="lime"/>
      </div>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name"/>
        </UFormGroup>
        <UFormGroup label="Phone" name="phone">
          <UInput v-model="state.phone" type="tel"/>
        </UFormGroup>
        <UFormGroup label="Facebook" name="facebook">
          <UInput v-model="state.facebook" type="tel"/>
        </UFormGroup>
        <UFormGroup label="Date" name="date">
          <UInput v-model="state.date" type="date"/>
        </UFormGroup>
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
  </UModal>
</template>

<style scoped>

</style>
