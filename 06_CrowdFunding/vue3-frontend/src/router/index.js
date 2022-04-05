import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AddProject from '../views/AddProject.vue'
import ProjectDetails from '../views/ProjectDetails.vue'
import ProjectRequests from '../views/ProjectRequests.vue'
import AddRequest from '../views/AddRequest.vue'

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
  {
    path: '/project-details',
    name: 'Project Details',
    component: ProjectDetails,
  },
  {
    path: '/view-requests',
    name: 'Project Requests',
    component: ProjectRequests,
  },
  {
    path: '/add-request',
    name: 'Add Request',
    component: AddRequest,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
