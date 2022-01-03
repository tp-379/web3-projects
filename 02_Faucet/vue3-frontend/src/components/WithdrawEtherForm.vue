<script>
import { inject, computed } from "vue"

export default {
  name: "Withdraw Ether Form",
  setup() {
    const store = inject("store")
    // console.log(store.state.currentAccount)
    const isAccountSelected = computed(() => store.state.currentAccount !== "")

    return {
      store,
      isAccountSelected,
    }
  },
}
</script>

<template>
  <div class="flex mx-auto">
    <button
      :disabled="!isAccountSelected"
      @click="store.methods.withdrawETH()"
      class="
        mx-auto
        text-base
        font-medium
        rounded-lg
        p-3
        bg-indigo-500
        text-white
      "
    >
      Withdraw 0.5 ETH
    </button>
  </div>
</template>
