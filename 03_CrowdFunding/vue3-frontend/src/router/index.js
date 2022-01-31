import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AddProject from '../views/AddProject.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/add-project',
    name: 'Add Project',
    component: AddProject,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
