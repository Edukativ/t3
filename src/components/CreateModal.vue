<script setup>
const props = defineProps({
  currentText: String
})
import Window from './Window.vue';
import Wbutton from './Wbutton.vue';

let newText = props.currentText

</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 bg-blue-500/50 items-center justify-center flex rounded-xl">
    <Window class="mx-80 p-4 w-full">
      <textarea v-model="newText" class="resize-none max-h-fit w-full p-3 bg-[#FCFBFB] rounded-xl border-[#6E6E6E] border"
        placeholder="Новый текст ..."  />
      <div class="flex justify-end">
        <Wbutton class="px-4 mx-2 mt-1 py-1" @click="$emit('clickConfirm', newText)">
          Подтвердить</Wbutton>
        <Wbutton class="px-8 mx-2 mt-1 py-1 bg-[#FF218B]" @click="$emit('clickCancel')">Закрыть</Wbutton>
      </div>
    </Window>
  </div>
</template>