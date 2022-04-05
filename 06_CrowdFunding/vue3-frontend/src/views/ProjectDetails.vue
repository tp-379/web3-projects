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
          Project Details
        </p>
      </div>
      <Summary />
      <div class="mt-8">
        <div class="flex items-center justify-between">
          <h2
            class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900"
          >
            Contribute to project
          </h2>
          <router-link to="/view-requests">
            <Button>View Project Requests</Button>
          </router-link>
        </div>
        <ContributeForm class="mt-5" />
        <Button class="mt-4">Contribute</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Summary from './../components/Summary.vue'
import ContributeForm from './../components/ContributeForm.vue'
import Button from './../components/Button.vue'

export default {
  components: {
    Summary,
    ContributeForm,
    Button,
  },
}
</script>
