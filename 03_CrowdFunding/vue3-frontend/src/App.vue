<template>
  <div class="min-h-full">
    <banner
      v-if="$store.state.error"
      class="bg-rose-600"
      :message="$store.state.error"
    />
    <nav-bar />
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Banner from './components/Banner.vue'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    Banner,
    NavBar,
  },
  setup() {
    const store = useStore()
    store.dispatch('isMetaMaskInstalled')
  },
}
</script>
