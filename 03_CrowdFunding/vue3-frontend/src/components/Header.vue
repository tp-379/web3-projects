<template>
  <div
    class="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Vuejs</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="./../assets/images/logo.png"
              alt="Vuejs"
            />
          </a>
        </div>
        <div class="md:flex items-center justify-end md:flex-1 lg:w-0">
          <Button
            v-if="store.state.defaultAccount === ''"
            @click="store.methods.onClickConnect"
            :disabled="!store.state.isMetaMask"
            >Connect Wallet</Button
          >
          <Button v-else disabled class="opacity-70 cursor-not-allowed"
            >Connected</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import Button from './Button.vue'

export default {
  name: 'Header',
  components: {
    Button,
  },
  setup() {
    const store = inject('store')

    return {
      store,
    }
  },
}
</script>
