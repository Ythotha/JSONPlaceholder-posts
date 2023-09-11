<template>
  <li class="post">
    <span class="post__title">
      {{ data.title }}
    </span>
    <span class="post__text">
      {{ data.body }}
    </span>
    <span class="post__author">
      {{ author }}
    </span>
  </li>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      required: true,
    },
    author: {
      type: String,
      required: true,
    }
  })
</script>

<style lang="postcss">
.post {
  padding: 1em;

  color: var(--color-black);

  background-color: var(--color-white);

  &__title,
  &__text,
  &__author {
    display: block;
  }

  &__title::first-letter,
  &__text::first-letter {
    text-transform: capitalize;
  }

  &__title {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--color-blue);
  }

  &__text {
    margin-top: .5em;
  }

  &__author {
    margin-top: .75em;

    font-size: .8em;
    color: var(--color-gray);
  }
}
</style>