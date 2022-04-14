<template>
<v-app class='cartinside'>
 <v-container text-xs-center justify-center >
        <v-layout row wrap>
            <v-flex xs12>
                <h1>ショッピングカート</h1>
                <div v-if="!carts[0].cartItemList.length">カートに商品がありません</div>
            </v-flex>
            
        <table v-if="carts[0].cartItemList.length">
            <thead>
                <tr>
                    <th class='table-head'>商品名</th>
                    <th class='table-head'>サイズ</th>
                    <th class='table-head'>数量</th>
                    <th class='table-head'>トッピング</th>
                    <th class='table-head'>小計(税抜)</th>
                    <th class='table-head'>削除</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in carts" :key="index" border="2">
                <tr v-for="(item1, index) in item.cartItemList" :key="index" >
                    <td class='table-body'>
                        <div>{{item1.name}}</div>

                        <img :src="item1.pic" class="img">
                    </td>
                    <td class='table-body'>{{item1.size}}</td>
                    <td class='table-body'>{{item1.number}}個</td>
                    <td class='table-body'><div v-for="(item2, index) in item1.topping" :key="index">{{item2}}</div></td>
                    <td class='table-body'>{{item1.total}}円</td>
                    <td class='table-body'><button @click="deleteConfirm(index)" class='btnDig'>削除</button></td>

                </tr>
            </tbody>
        </table>

        </v-layout>
        

    </v-container>
    <template v-if="carts[0].cartItemList.length">
        <div>消費税：{{totalTax()}}円</div>
        <div>ご注文金額合計：{{total()}}円(税込)</div>
        <button @click="checkOrLogin()" class='btnDig'>注文に進む</button> 
        <p></p>
    </template>
</v-app>
</template>


<script>
import {mapActions} from 'vuex'
  export default {
    data(){
        return{
            headers:[
                {text:"商品名",value:"cartItemList[].name"},
                {text:"サイズ",value:"size"},
                {text:"数量",value:"number"},
                {text:"トッピング",value:"topping"},
                {text:"小計(税抜)",value:"total"},
                {text:"削除",value:"delete"}           
            ],
            carts:[],
            cartObject:{}
          }
      },
    methods:{ 
        deleteConfirm(index){
            if(confirm("削除してもよろしいですか？")){
                this.carts[0].cartItemList.splice(index,1)
                this.cartObject = this.carts[0]
                this.deleteCartItem({
                    cart:this.cartObject
                    })   
            }
        },
        checkOrLogin(){
            if(this.$store.state.login_user){
                this.addOrderList(this.carts)
                this.$router.push({name:"Check"})
            }else if(!this.$store.state.login_user){
                this.addOrderList(this.carts)
                this.$router.push({name:"Check"})
            }
        },
        totalTax(){
            let total = []
            this.carts[0].cartItemList.forEach(ele => {
                total.push(ele.total * 0.1)
            })
            let totalTax =total.reduce((sum,element) => {
                return sum + element;
            },0)
            return totalTax
        },
        total(){
            let total = []
            this.carts[0].cartItemList.forEach(ele => {
            total.push(ele.total * 1.1)
            })
            let totals = total.reduce((sum,element) => {
                return sum + element;
            },0)
            return Math.floor(totals)
        },
        ...mapActions(['deleteCartItem','login','addOrderList'])
    },
    created(){
        this.carts.push(this.$store.state.cartlist)
    },
      }
</script>


<style>
    .img {
        width: 200px;
        height: 140px;
    }
    .cartinside{
  font-family: 'Hannotate TC',sans-serif;;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  margin: 0 2em;
}
.table-head {
  width: auto;
  padding: 10px 0;
background-color:  rgb(250, 218, 131);
}

.table-body {
    text-align: center;
  width: auto;
  padding: 10px 0;
border-bottom: solid 1px rgb(250, 218, 131);
border-top: solid 1px rgb(250, 218, 131);
  border-collapse: separate;
}
</style>
