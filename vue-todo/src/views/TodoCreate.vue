<template>
  <div class="create">
    <h1>Todo新規作成画面</h1>

    <h2>チケット名</h2>
    <input type="text">

    <h2>チケット詳細</h2>
    <input type="text">

    <h2>担当者</h2>
    <input type="text">

    <h2>期日(Todoの期限を設定してください)</h2>
    <input type="text">
    
    <h2>開始日</h2>
    <input type="text">

    <div style="margin-top:50px">
      <button>チケット作成</button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'TodoCreate',



};
</script>