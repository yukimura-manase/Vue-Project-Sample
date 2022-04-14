<template>
    <div>
        <h1>Todo詳細</h1>
        <h2>{{selectTodo.id}}</h2>
        <h2>{{selectTodo.task}}</h2>
        
    </div>
</template>

<script>
export default {
    name: 'TodoDetail',

    data(){
        return {
            selectTodo: null,
        };
    },

    created(){
        // console.log('画面生成');
        // console.log(this.selectTodo);
        // console.log(this.$router);
        // console.log(this.$route);
        //console.log(this.$route.params);

        let todoId = Number(this.$route.params.id);
        //console.log(typeof todoId);

        let todoList = this.$store.state.todoList;
        //console.log(todoList);
        
        let detailTodo = todoList.find(todo =>  todo.id === todoId);
        //console.log(detailTodo);
        this.selectTodo = detailTodo;
        //console.log(this.selectTodo);
    },


};
</script>





