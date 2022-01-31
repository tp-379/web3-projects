<template>
  <div class="mt-10 border-2 border-gray-400">
    <dl class="grid grid-cols-4">
      <div v-for="d in data" :key="d.heading" class="relative p-4">
        <dt>
          <p class="text-lg leading-6 font-medium text-gray-900 text-center">
            {{ d.heading }}
          </p>
        </dt>
        <dd class="mt-2 text-base text-gray-500 text-center">
          {{ d.count }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
const data = [
  {
    heading: 'Total Projects',
    count: '100',
  },
  {
    heading: 'Total Requests',
    count: '280',
  },
  {
    heading: 'Active Requests',
    count: '20',
  },
  {
    heading: 'Funded Amount',
    count: '500 ETH',
  },
]

export default {
  setup() {
    return {
      data,
    }
  },
}
</script>
