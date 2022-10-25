import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/MainPage.vue';
import Error from '../views/Error.vue';
import PostsByUser from '../views/PostsByUser.vue';
import NewPost from '../views/NewPost.vue';

import { isLogged } from '../utils/auth';

Vue.use(VueRouter);

function authCheck(to, from, next) {
  if (!isLogged()) {
    next({
      path: '/error'
    });
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/postsByUser',
    name: 'PostsByUser',
    beforeEnter: authCheck,
    component: PostsByUser
  },
  {
    path: '/newPost',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;