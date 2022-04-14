<template>
    <div class="order">
        <h1>注文履歴</h1>
        <div v-if="!this.ordereds.length">注文した商品はありません。</div>
        <table v-if="this.ordereds.length">
      <tr>
        <th class="table-head">注文日時</th>
        <th class='table-head'>商品画像</th>
        <th class='table-head'>商品名</th>
        <th class='table-head'>小計</th>
      </tr>
          <tbody v-for="(item, index) in ordereds" :key="index">
            <tr v-for="(item2, index) in item.cartItemList" :key="index">
                <td class="table-body">{{item.orderDate}}</td>
                <td class='table-body'><img :src="item2.pic" id="picture"></td>
                <td class='table-body'>{{ item2.name }}</td>
                <td class='table-body'>{{ item2.total }}円</td>
            </tr>
          </tbody>
          </table>
        <div>
        <router-link :to="{name:'About'}"><button class="btnDig">一覧画面に戻る</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order',
    data(){
        return{
            ordereds:[]
        }
    },
    created(){
      this.ordereds = this.$store.state.orderedsList
    },
  }

</script>
<style>
.order{
  font-family: 'Hannotate TC',sans-serif;;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  margin: 0 2em;
}
</style>