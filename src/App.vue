<template>
  <div class="app">
    <posts-list
      v-if="!isDataLoading"
      :posts="posts"
      :users="users"
    >
    </posts-list>
    <post-item
      
      :data="posts[0]"
      author="kek"
    ></post-item>
  </div>
</template>

<script setup>
import arrayToObject from '@/helpers/arrayToObject'

import { ref, computed,  onMounted } from 'vue'

import PostsList from './components/PostsList/PostsList.vue'

const posts = ref({})
const isPostsLoading = ref(true)

const users = ref({})
const isUsersLoading = ref(true)

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
    users.value = arrayToObject(json)
    isUsersLoading.value = false
  });
})
</script>

<style lang="postcss">
.app {
  min-height: 100vh;
  background-color: var(--color-lightblue);
}
</style>
