<template>
  <ul class="posts">
    <posts-item
      v-for="post in posts"
      :key="post.id"
      :data="post"
      :author="users[post.userId].name"
      class="posts__item"
    >
    </posts-item>
  </ul>
</template>

<script setup>
import PostsItem from './components/PostsItem.vue'

defineProps({
  posts: {
    type: Object,
    required: true,
  },
  users: {
    type: Object,
    required: true,
  }
})

</script>

<style lang="postcss">
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1em;
  padding: 1em;

  list-style-type: none;
}
</style>