<script>
import { inject } from 'vue'

export default {
  name: 'RetrieveMessage',
  setup() {
    const store = inject('store')

    return {
      store
    }
  }
}
</script>

<template>
    <h1 class="text-3xl font-bold text-gray-600">
      {{ store.state.message }}
    </h1>
</template>
