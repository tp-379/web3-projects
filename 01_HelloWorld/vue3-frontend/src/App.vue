<script>
import { provide } from 'vue'
import store from './store'
import RetrieveMessage from './components/RetrieveMessage.vue'
import StoreMessage from './components/StoreMessage.vue'

export default {
  name: 'App',
  components: {
    RetrieveMessage,
    StoreMessage
  },
  setup() {
    provide('store', store)
    store.methods.connectBlockchain()
    store.methods.getContractData()

    return {
      store
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
  <div class="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
    <div class="max-w-md mx-auto" v-if="store.state.isLoading">
      <div class="font-bold text-purple-500 mx-auto">loading...</div>
    </div>
    <div class="max-w-md mx-auto" v-else>
      <img src="./assets/logo.png" class="h-18 mx-auto mb-4" />
      <div class="font-bold text-red-500 mx-auto">{{ store.state.error }}</div>
      <retrieve-message class="text-center mb-8"/>
      <store-message />
    </div>
  </div>
</div>
</template>
