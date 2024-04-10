<script setup lang="ts">
import type {Book, User} from "~/types";

const MAX_BOOK = 3

const toast = useToast();
const shoppingCart = ref<Book[]>([]);
const isShowCart = ref(false);
const isShowForm = ref(false);

const isLoading = ref(false)
const onSelect = (book: Book) => {
  if (shoppingCart.value.length < MAX_BOOK) {
    shoppingCart.value = [...new Set([...shoppingCart.value, book])];
    toast.add({
      title: `Added ${book.name} to cart`,
      timeout: 1000,
      color: "amber"
    })
  } else {
    toast.add({
      title: `Can not select over ${MAX_BOOK} books.`,
      timeout: 2000,
      color: "red"
    })
  }
};

const onSubmitForm = async (user:User) => {
  isLoading.value = true
  const books = shoppingCart.value.map(b => b.name)

  const { data } = await useFetch<{status: boolean}>('/api/book', {
    method: "POST",
    body: {...user, book: books.join(",\n")}
  })

  if (data) {
    toast.add({
      title: "Submit success!",
      timeout: 0
    })
    shoppingCart.value = []
  } else {
    toast.add({
      title: "Submit failed, please try again later...",
      color: "red"
    })
  }

  isLoading.value = false
}
const onRemoveItem = (Rid: string) => {
  shoppingCart.value = shoppingCart.value.filter(({id}) => id!== Rid)
}

const {data: books, pending: bookLoading} = await useFetch<Book[]>('/api/book')
</script>

<template>
  <UContainer class="py-4">
    <div class="flex pb-3 mb-5 sticky top-0 bg-black px-3 pt-5">
      <h1 class="text-3xl font-bold ">List</h1>
      <UChip :text="shoppingCart.length" color="red" size="2xl" class="ml-auto">
        <UButton icon="i-heroicons-shopping-cart" color="gray" @click="isShowCart = !isShowCart"/>
      </UChip>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5" v-if="books">
      <Card
          v-for="book in books" :key="book.id"
          :book="book"
          @on-select="onSelect(book)"
      />
    </div>
    <Cart @remove="onRemoveItem" :items="shoppingCart" v-model="isShowCart" @submit="isShowForm = true" />
    <UserForm v-model="isShowForm" @submit="onSubmitForm" />
  </UContainer>
  <UNotifications class="bottom-auto top-0"/>
  <Loading v-model="isLoading || bookLoading" />
</template>
