<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})
</script>

<template>
  <h1 class="text-3xl font-bold text-gray-600 mx-auto">
    {{ msg }}
  </h1>
</template>
