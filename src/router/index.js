import { createRouter, createWebHistory } from 'vue-router'
import todos from '../views/todos.vue'
import post from '../views/post.vue'


const routes = [
  {
    path: '/',
    name: 'todos',
    component: todos
  },
  {
    path: '/post',
    name: 'post',
    component: post
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
}) 

export default router