<script>
import { ref, inject, computed } from 'vue'

// const message = ref('')
// const isMessagePresent = computed(() => message.value.length > 0)

export default {
  name: 'StoreMessage',
  setup() {
    const message = ref('')
    const store = inject('store')
    const isMessagePresent = computed(() => message.value.length > 0)

    return {
      store,
      message,
      isMessagePresent
    }
  }
}
</script>

<template>
    <div class="grid grid-cols-2 gap-x-6">
      <input type="text" v-model="message" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="your message goes here..." />
      <button :disabled="!isMessagePresent" @click="store.methods.storeMessage(message)" class="text-base font-medium rounded-lg p-3 bg-indigo-500 text-white">Update</button>
    </div>
</template>
