<script>
import { provide } from "vue"
import store from "./store"
import ContractData from "./components/ConractData.vue"
import WithdrawForm from "./components/WithdrawEtherForm.vue"

export default {
  name: "App",
  components: {
    ContractData,
    WithdrawForm,
  },
  setup() {
    provide("store", store)
    store.methods.connectBlockchain()
    store.methods.getContractData()

    return {
      store,
    }
  },
}
</script>

<template>
  <div
    class="
      min-h-screen
      bg-gray-50
      py-6
      flex flex-col
      justify-center
      relative
      overflow-hidden
      sm:py-12
    "
  >
    <img
      src="./assets/beams.jpg"
      alt=""
      class="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        max-w-none
      "
      width="1308"
    />
    <div
      class="
        absolute
        inset-0
        bg-[url(grid.svg)] bg-center
        [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]
      "
    ></div>
    <div
      class="
        relative
        px-6
        pt-10
        pb-8
        bg-white
        shadow-xl
        ring-1 ring-gray-900/5
        sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10
      "
    >
      <div class="max-w-md mx-auto" v-if="store.state.isLoading">
        <div class="font-bold text-red-500 mx-auto">connecting...</div>
      </div>
      <div class="max-w-md mx-auto" v-else>
        <div class="max-w-md mx-auto" v-if="store.state.error">
          <div class="font-bold text-red-500 mx-auto">
            {{ store.state.error }}
          </div>
        </div>
        <img src="./assets/logo.png" class="h-16 mx-auto" />
        <div class="divide-y divide-gray-300/50">
          <div class="py-8 text-base leading-7 space-y-6 text-gray-600">
            <contract-data />
          </div>
          <div class="pt-8 text-base leading-7">
            <p class="mb-2">
              Want to withdraw ETHER? You can withdraw only upto 0.5 ETH at a
              time.
            </p>
            <withdraw-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
