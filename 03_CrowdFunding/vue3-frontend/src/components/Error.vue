<template>
  <div class="bg-red-600">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span class="flex p-2 rounded-lg bg-red-800">
            <ExclamationIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            {{ store.state.error }}
          </p>
        </div>

        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button
            type="button"
            class="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
          >
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { ExclamationIcon, XIcon } from '@heroicons/vue/outline'

export default {
  name: 'Error',
  components: {
    ExclamationIcon,
    XIcon,
  },
  setup() {
    const store = inject('store')

    return {
      store,
    }
  },
}
</script>
