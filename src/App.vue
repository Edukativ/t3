<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePosts } from './posts.js'
import CreatePost from './components/CreatePost.vue';
import Window from './components/Window.vue';
import Wbutton from './components/Wbutton.vue';

const postsStore = usePosts();
const { allPosts } = storeToRefs(postsStore)
const newPostText = ref('');

function addPost() {
  if (!newPostText.value) {
    return;
  }

  postsStore.addPost(newPostText.value);
  newPostText.value = '';
}

</script>

<template>
  <Window class="flex justify-between mx-80 mt-7 p-3 mb-10">
    <input v-model="newPostText" class="w-full p-2 bg-[#FCFBFB] rounded-xl border-[#6E6E6E] border"
      placeholder="Новый пост ..." />
    <Wbutton class="ml-4 px-6 py-1" @click="addPost">Добавить</Wbutton>
  </window>
  <ul v-for="post in allPosts" :key="post.id">
    <CreatePost :post="post"
      @click-remove="postsStore.removePost(post.id)" @click-edit="postsStore.editPost(post.id, $event)" />
  </ul>
</template>