<script>
import { inject } from "vue"
export default {
  name: "Contract Data",
  setup() {
    const store = inject("store")
    return {
      store,
    }
  },
}
</script>
<template>
  <div class="text-base leading-7 space-y-6 text-gray-600">
    <div class="flex">
      <p class="mx-auto">Data fetched from Blockchain (using Ganache here):</p>
    </div>
    <ul class="space-y-4">
      <li class="flex items-center">
        <svg
          class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="11" />
          <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
        </svg>
        <p class="ml-4">
          contract Owner:
          <code class="text-sm font-bold text-gray-900">{{
            store.state.ownerAddress
          }}</code>
        </p>
      </li>
      <li class="flex items-center">
        <svg
          class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="11" />
          <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
        </svg>
        <p class="ml-4">
          contract Address:
          <code class="text-sm font-bold text-gray-900">{{
            store.state.contractAddress
          }}</code>
        </p>
      </li>
      <li class="flex items-center">
        <svg
          class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="11" />
          <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
        </svg>
        <p class="ml-4">
          Contract Balance:
          <code class="text-sm font-bold text-gray-900">{{
            store.state.contractBalance
          }}</code>
          ETH
        </p>
      </li>
      <li class="flex items-center">
        <svg
          class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="11" />
          <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
        </svg>
        <p class="ml-4">
          Current Address:
          <code class="text-sm font-bold text-gray-900">{{
            store.state.currentAccount
          }}</code>
        </p>
      </li>
      <li class="flex items-center">
        <svg
          class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="11" />
          <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
        </svg>
        <p class="ml-4">
          Current Address Balance:
          <code class="text-sm font-bold text-gray-900">{{
            store.state.currentAccountBalance
          }}</code>
          ETH
        </p>
      </li>
    </ul>
  </div>
</template>
