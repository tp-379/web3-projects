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
            A better way to fund a project
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white mt-6">
      <div
        class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div class="flex items-center justify-between">
          <h2
            class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900"
          >
            Open Projects
          </h2>
          <router-link to="/add-project">
            <Button>Add Project</Button>
          </router-link>
        </div>
        <div
          class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8"
        >
          <ProjectCard
            v-for="project in projects"
            :key="project"
            :address="project"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, useStore } from 'vuex'
import ProjectCard from './../components/ProjectCard.vue'
import Button from './../components/Button.vue'
import { computed } from '@vue/runtime-core'

export default {
  components: {
    ProjectCard,
    Button,
  },
  setup() {
    const store = useStore()
    const projects = computed(() => store.getters.getLoadedProjects)

    return {
      projects,
    }
  },
}
</script>
