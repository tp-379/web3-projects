<script>
import { provide } from 'vue'
import store from './store'
import DataCard from './components/DataCard.vue'
import Error from './components/Error.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    DataCard,
    Error,
    Header,
  },
  setup() {
    provide('store', store)
    store.methods.isMetaMaskInstalled()

    return {
      store,
    }
  },
}
</script>
<template>
  <Error v-if="store.state.error" />
  <Header />
  <div
    class="min-h-screen bg-gray-50 py-4 flex flex-col justify-center relative overflow-hidden"
  >
    <img
      src="./assets/images/beams.jpg"
      alt=""
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
      width="1308"
    />
    <div
      class="absolute inset-0 bg-[url(grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <DataCard />
  </div>
</template>
