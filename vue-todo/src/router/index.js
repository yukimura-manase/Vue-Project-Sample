import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoList from '../views/TodoList.vue';
import TodoCreate from '../views/TodoCreate.vue';
import TodoDetail from '../views/TodoDetail.vue';

Vue.use(VueRouter);

// ルーティング設定の変数を定義 => 表示するview(画面)のルーティング設定をする！ => path, name, componentの設定
const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/create',
    name: 'TodoCreate',
    component: TodoCreate
  },
  {
    path: '/detail/:id', // パラメーターを受け取れるように設定
    name: 'TodoDetail',
    component: TodoDetail
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
