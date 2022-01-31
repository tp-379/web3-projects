<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2
          class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
        >
          CrowdFunding
        </h2>
        <p
          class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          A better way to fund a project
        </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Here is a summary of all the projects we have funded so far. Also the
          amount which is funded and total number of requests.
        </p>
      </div>

      <div class="mt-10 border-2 border-gray-400">
        <dl class="grid grid-cols-4">
          <div v-for="d in data" :key="d.heading" class="relative p-4">
            <dt>
              <p
                class="text-lg leading-6 font-medium text-gray-900 text-center"
              >
                {{ d.heading }}
              </p>
            </dt>
            <dd class="mt-2 text-base text-gray-500 text-center">
              {{ d.count }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
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
