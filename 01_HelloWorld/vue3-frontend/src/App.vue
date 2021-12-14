<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Message from './components/Message.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
  <div class="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
    <div class="max-w-md mx-auto">
      <img src="./assets/logo.png" class="h-14 mx-auto mb-4" />
      <Message msg="Hello Vue 3 + Vite" />
    </div>
  </div>
</div>
</template>
