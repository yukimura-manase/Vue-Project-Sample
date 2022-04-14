<template>
  <div id="done">
    <h1>決済が完了しました！</h1>
    <div>この度はご注文ありがとうございます。</div>
    <div>お支払い先は、お送りしたメールに記載してありますのでご確認ください。</div>
    <div>メールが届かない場合は「注文履歴」からご確認ください。</div>
    <router-link :to="{name:'About'}"><button>TOP画面へ</button></router-link>
  </div>
</template>

<script>
export default{
  name:'Done',
}
</script>
<style>
#done{
  font-family: 'Hannotate TC',sans-serif;;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  margin: 0 2em;
}
</style>