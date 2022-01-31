<template>
  <div class="px-4 py-6 sm:px-0">
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
            Add a new project to fund
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Enter the minimum contribution
          </p>
          <ContributeForm />
          <Button class="mt-4">Add Project</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContributeForm from './../components/ContributeForm.vue'
import Button from './../components/Button.vue'

export default {
  components: {
    ContributeForm,
    Button,
  },
}
</script>
