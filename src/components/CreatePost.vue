<script setup>
import { provide, ref } from 'vue'
import CreateModal from './CreateModal.vue';
import window from './Window.vue'
import Wbutton from './Wbutton.vue';
import { usePosts } from '@/posts';
import { storeToRefs } from 'pinia';

const postsStore = usePosts();
const { allPosts } = storeToRefs(postsStore)

const emit = defineEmits(['clickRemove', 'clickEdit'])
const props = defineProps({
  post: Object,
})

const state = ref(false)
function updateState() {
  state.value = !state.value
}

function editPost(newtext) {
  postsStore.editPost(props.post.id, newtext)
  updateState()
}

const isShowComments = ref(false)
const newComment = ref('')

const comments = ref(props.post.comments)
</script>

<template>
  <window class="mx-80 mt-7 p-3">
    <p class="text-lg whitespace-break-spaces text-pretty">{{ props.post.text }}</p>
    <hr class="h-px mt-4 my-3 mr-3 bg-stone-500/40 border-0" />

    <div class="flex w-full">
      <Wbutton class="px-4 ml-2" @click="isShowComments = !isShowComments">Комментарии</Wbutton>
      <p class=" text-gray-800 text-sm p-2 overflow-hidden">Количество комментариев - {{ comments.length }}</p>
      <Wbutton class="ml-auto mx-2 px-4" @click="updateState">Изменить</Wbutton>
      <Wbutton class="mx-2 px-4 bg-[#FF218B]" @click="$emit('clickRemove')">Удалить</Wbutton>
    </div>

    <transition name="blur" enter-active-class="transition-all duration-100"
      leave-active-class="transition-all duration-500">
      <CreateModal v-if="state" @click-cancel="updateState" @click-confirm="editPost" :currentText="props.post.text" />
    </transition>
  </window>

  <transition name="blur" enter-active-class="transition-all duration-100"
  leave-active-class="transition-all duration-500">
  <window class="mx-80 mt-7 p-3" v-show="isShowComments">
    <p class="text-lg whitespace-break-spaces text-pretty">{{ props.post.text }}</p>
    <hr class="h-px mt-4 my-3 mr-3 bg-stone-500/40 border-0" />
    <div class="flex mr-2 my-4">
      <input v-model="newComment" class="w-full mr-4 p-1 bg-[#FCFBFB] rounded-xl border-[#6E6E6E] border"
        placeholder="Новый комментарий ..." />
      <Wbutton class="px-7" @click="() => { postsStore.addComment(props.post.id, newComment); newComment = '' }">
        Добавить
      </Wbutton>
    </div>

    <div class="flex mr-2 my-4" v-for="(comment, index) in comments" :key="comment">
      <p class="w-full mr-4 p-1 bg-[#FCFBFB] rounded-xl border-[#0094FF] border-2">{{ comment }}</p>
      <Wbutton class="px-9 bg-[#FF218B]" @click="() => { postsStore.removeComment(props.post.id, index) }">Удалить
      </Wbutton>
    </div>
  
  </window>
</transition>
</template>