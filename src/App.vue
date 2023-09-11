<template>
  <div class="app">
    <div class="app__container">
      <input v-model="filterValue" type="search" class="app__search" placeholder="Фильтрация по автору поста">
      <div v-if="isDataLoading">
        Заружаем посты
      </div>
      <div v-else-if="usersFiltered.length === 0">
        Совпадений не найдено
      </div>
      <posts-list
        v-else-if="!isDataLoading"
        :posts="posts"
        :users="usersObject"
      >
      </posts-list>
    </div>
  </div>
</template>

<script setup>
import arrayToObject from '@/helpers/arrayToObject'

import { ref, computed, watch, onMounted } from 'vue'

import PostsList from './components/PostsList/PostsList.vue'

const posts = ref({})
const isPostsLoading = ref(true)

const users = ref({})
const isUsersLoading = ref(true)
const usersObject = computed(() => {
  return arrayToObject(users.value)
})

const isDataLoading = computed(() => {
  return isPostsLoading.value || isUsersLoading.value
})

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {
    posts.value = json
    isPostsLoading.value = false
  });

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => {
    users.value = json
    isUsersLoading.value = false
  });
})

const filterValue = ref('')
const usersFiltered = computed(() => {
  if (!isUsersLoading.value) {
    return users.value.filter((user) => user.name.toLowerCase().includes(filterValue.value.toLowerCase()))
  }

  return 0
})

watch(filterValue, (value) => {
  let queryString = ''
  if (value !== '') {
    queryString = usersFiltered.value.reduce((accumulator, user, index) => {
      if (index !== 0) {
        accumulator += '&'
      }

      accumulator += `userId=${user.id}`
      return accumulator
    }, '?')

  }

  if (usersFiltered.value.length > 0) {
    fetch(`https://jsonplaceholder.typicode.com/posts${queryString}`)
    .then((response) => response.json())
    .then((json) => {
      posts.value = json
    });
  }
})

</script>

<style lang="postcss">
.app {
  box-sizing: border-box;
  min-height: 100vh;
  
  padding: 1em;

  background-color: var(--color-lightblue);

  &__container {
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    gap: 1em;
    max-width: 75rem;
    margin-inline: auto;
  }

  &__search {
    position: sticky;
    top: 0;

    min-width: 15.625rem;
    padding: .5em;
  }
}
</style>
