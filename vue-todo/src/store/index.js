import Vue from 'vue';
import Vuex from 'vuex';

// VueインスタンスにVuexを設定する！
Vue.use(Vuex);

// VuexインスタンスのStore機能をexport！
export default new Vuex.Store({
  state: {
    todoList:[ 
      {id:1,user_id:1,task:'Vueの学習',detail:'Vueを学ぶロボ玉',handler:'ロボ玉試作1号機',date:'2100-12-12',start:'1995-12-12'},
      {id:2,user_id:1,task:'TypeScriptの学習',detail:'TypeScriptを学ぶロボ玉',handler:'ロボ玉試作2号機',date:'2100-12-12',start:'1995-12-12'},
      {id:3,user_id:1,task:'PostgreSQLの学習',detail:'PostgreSQLを学ぶロボ玉',handler:'ロボ玉試作3号機',date:'2100-12-12',start:'1995-12-12'}
  ]
  },
  mutations: {
    deleteTodo(state, todoId){

      let deleteIndex = this.state.todoList.findIndex( todo => todo.id === todoId);

      state.todoList.splice(deleteIndex, 1);

      console.log(state.todoList);

    },

  },
  actions: {
    deleteTodo({commit}, todoId){
      console.log(todoId);
      commit('deleteTodo', todoId);
    },

  },
  getters: {

  }
});
