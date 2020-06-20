import Vue from 'vue'
import Router from 'vue-router'
import Todolist from './components/index.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  name: 'Todolist',
  component: Todolist
}]
const router = new Router({
  routes: routes
})

export default router
