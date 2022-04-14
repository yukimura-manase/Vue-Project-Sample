<template>
  <div class="home">
    <h1>Todo一覧</h1>

    <h2 v-for="todo in todos" v-bind:key="todo.id">
      <span>{{todo.id}}</span>
      <span v-on:click="detail(todo.id)">{{todo.task}}</span>
      <span><button @click="remove(todo.id)">削除</button></span>
    </h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // 1. mapActions読み込み！

export default {
  name: 'TodoList',

  data(){
    return {
      todos: [],
    }
  },

  // 画面生成時に、処理発動
  created(){
    // console.log('TodoList生成時');
    // console.log(this); // VueComponent
    // console.log(this.todos); // このvueコンポーネントのtodos
    this.todos = this.$store.state.todoList; // thisでVueインスタンスを指定している！
    //console.log(this.todos);
  },

  methods:{
    ...mapActions(['deleteTodo']), // 2. methodsオプション内で、mapActionsメソッドとactionを登録(配列形式)することで、コンポーネント内で呼び出すことができる！

    detail(todoId){
      //console.log(todoId);
      this.$router.push(`/detail/${todoId}`); // パラメーターを渡す！
    },
    remove(todoId){
      console.log(todoId);

      let removeCheck = window.confirm('削除してもよろしいですか？');

      if(removeCheck){
        this.deleteTodo(todoId);
      }

    },
  },


  
};
</script>
