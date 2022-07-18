
import {createRouter,createWebHashHistory} from 'vue-router';
import Home from './Home.vue';
import Login from './Login.vue';

const routes = [
  {
    path:'/',redirect:'/home',
    
  },
  {path:'/home',component:Home,},
  {path:'/login',component:Login,}
];

const router = createRouter({
  history:createWebHashHistory(),
  routes,
});

export default router;