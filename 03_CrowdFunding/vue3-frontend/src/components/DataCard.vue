<template>
  <div
    class="relative px-6 pt-8 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10"
  >
    <div class="max-w-md mx-auto">
      <img
        src="./../assets/images/logo.png"
        class="h-16 mx-auto"
        alt="Vuejs Logo"
      />
      <div class="divide-y divide-gray-300/50 text-center">
        <div class="py-8 text-lg leading-7 space-y-6 text-gray-600">
          <p class="font-bold">
            Built using Vuejs v3, Vite, Tailwind CSS and web3js.
          </p>
          <ul class="space-y-4 border-2 border-gray-400 p-4">
            <li class="flex justify-center">
              <div v-if="store.state.defaultAccount">
                {{ store.state.defaultAccount }}
              </div>
              <div v-else>--- Default Account Address ---</div>
            </li>
          </ul>
          <Button
            :disabled="!store.state.defaultAccount"
            @click="store.methods.getAccountBalance"
            >Get Account Balance</Button
          >
        </div>
        <div class="pt-8 text-lg text-gray-600 leading-7 font-semibold">
          <p>
            This is a starter DApp to get started quickly for DApp development
            on Ethereum.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import Button from './Button.vue'

export default {
  name: 'DataCard',
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
