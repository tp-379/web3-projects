<script>
import { ref, inject, computed } from "vue";

export default {
  name: "Withdraw Ether Form",
  setup() {
    const ether = ref("");
    // const store = inject('store')
    const isInputPresent = computed(() => ether.value.length > 0);

    return {
      //   store,
      ether,
      isInputPresent,
    };
  },
};
</script>

<template>
  <div class="grid grid-cols-2 gap-x-6">
    <input
      type="text"
      v-model="ether"
      class="focus:ring-indigo-500 focus:border-indigo-500 p-2 flex-1 block w-full rounded sm:text-sm border-gray-300"
      placeholder="amount of ether to withdraw..."
    />
    <button
      :disabled="!isInputPresent"
      class="text-base font-medium rounded-lg p-3 bg-indigo-500 text-white"
    >
      Withdraw
    </button>
  </div>
</template>
