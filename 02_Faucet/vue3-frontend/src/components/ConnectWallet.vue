<script>
import { inject } from "vue"

export default {
  name: "Conect Wallet",
  setup() {
    const store = inject("store")

    return {
      store,
    }
  },
}
</script>

<template>
  <div class="flex text-sm font-medium">
    <ul class="mx-auto space-x-3">
      <li>
        <button
          type="button"
          class="
            bg-indigo-600
            text-white text-sm
            leading-6
            font-medium
            py-2
            px-3
            rounded-lg
          "
          @click="store.methods.detectMetamask"
        >
          Connect Wallet
        </button>
      </li>
    </ul>
  </div>
</template>
