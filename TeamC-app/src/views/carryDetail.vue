<template>
  <div class="detail">
    <h1>商品詳細</h1>
    <table>
      <tr>
        <td id="title">{{ fitems.name }}</td>
      </tr>
      <tr>
        <td rowspan="4">
          <img :src="fitems.pic" id="picture">
        </td>
        <td>
          <p>{{ fitems.detail }}</p>
        </td>
      </tr>
      <tr>
        <div class='explain'> サイズを選択してください</div>
        <p>
          <input type="radio" class="button" id='M' value="M" checked="checked" v-model="sizeModel" /><label for='M' >
            <span class="size" >&nbsp;M&nbsp;&nbsp;{{fitems.msizePrice}}(税抜)</span></label>
        </p>
        <p>
          <input type="radio" id='L'  value="L" v-model="sizeModel"/>
            <span class="size" ><label for='L'>&nbsp;Ｌ&nbsp;&nbsp;{{ fitems.lsizePrice }}(税抜)</label></span>
        </p>
        <p>{{error}}</p>
      </tr>
      <tr>
        <div class='explain'> 数量を選択してください</div>
        <table border=1>数量：<select class="number" v-model="numberModel">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      </table> 
      <p>{{error2}}</p>
      </tr>

    </table>
<p></p>
<p></p>
<div>
    <div class='explain'>
      トッピング：１つにつき M 200円(税抜) L 300円(税抜)
    </div>
    <div class="topping">
      <label for='オニオン'><input type="checkbox" id='オニオン' value="オニオン" v-model="toppingItem"/>オニオン</label>&nbsp;&nbsp;
      <label for='ツナマヨ'><input type="checkbox" id='ツナマヨ' value="ツナマヨ" v-model="toppingItem"/>ツナマヨ</label>&nbsp;&nbsp;
      <label for='イタリアントマト'><input type="checkbox" id='イタリアントマト' value="イタリアントマト" v-model="toppingItem"/>イタリアントマト</label>&nbsp;&nbsp;
      <label for='イカ'><input type="checkbox" id='イカ' value="イカ" v-model="toppingItem"/>イカ</label>&nbsp;&nbsp;
      <label for='プルコギ'><input type="checkbox" id='プルコギ' value="プルコギ" v-model="toppingItem"/>プルコギ</label>&nbsp;&nbsp;
      <label for='アンチョビ'><input type="checkbox" id='アンチョビ' value="アンチョビ" v-model="toppingItem"/>アンチョビ</label>&nbsp;&nbsp;
      <label for='エビ'><input type="checkbox" id='エビ' value="エビ" v-model="toppingItem"/>エビ</label>&nbsp;&nbsp;
      <label for='コーン'><input type="checkbox" id='コーン' value="コーン" v-model="toppingItem"/>コーン</label>&nbsp;&nbsp;
      <label for='ピーマン'><input type="checkbox" id='ピーマン' value="ピーマン" v-model="toppingItem"/>ピーマン</label>&nbsp;&nbsp;
      <label for='フレッシュスライストマト'><input type="checkbox" id='フレッシュスライストマト'
        value="フレッシュスライストマト"
      v-model="toppingItem"/>フレッシュスライストマト</label>&nbsp;&nbsp;
      <label for='ベーコン'><input type="checkbox" id='ベーコン' value="ベーコン" v-model="toppingItem"/>ベーコン</label>&nbsp;&nbsp;
      <label for='ペパロニ･サラミ'><input type="checkbox" id='ペパロニ･サラミ' value="ペパロニ･サラミ" v-model="toppingItem"/>ペパロニ･サラミ</label>&nbsp;&nbsp;
      <label for='熟成ベーコン'><input type="checkbox" id='熟成ベーコン' value="熟成ベーコン" v-model="toppingItem"/>熟成ベーコン</label>&nbsp;&nbsp;
      <label for='特製マヨソース'><input type="checkbox" id='特製マヨソース' value="特製マヨソース" v-model="toppingItem"/>特製マヨソース</label>&nbsp;&nbsp;
      <label for='カマンベールチーズ'><input type="checkbox" id='カマンベールチーズ' value="カマンベールチーズ" v-model="toppingItem"/>カマンベールチーズ</label>&nbsp;&nbsp;
      <label for='フレッシュモッツァレラチーズ'><input type="checkbox" id='フレッシュモッツァレラチーズ'
        value="フレッシュモッツァレラチーズ" v-model="toppingItem"
      />フレッシュモッツァレラチーズ</label>&nbsp;&nbsp;
      <label for='イタリアンソーセージ'><input type="checkbox" id='イタリアンソーセージ' value="イタリアンソーセージ" v-model="toppingItem"/>イタリアンソーセージ</label>&nbsp;&nbsp;
      <label for='ガーリックスライス'><input type="checkbox" id='ガーリックスライス' value="ガーリックスライス" v-model="toppingItem"/>ガーリックスライス</label>&nbsp;&nbsp;
      <label for='あらびきスライスソｰセｰジ'><input type="checkbox" id='あらびきスライスソｰセｰジ'
        value="あらびきスライスソｰセｰジ" v-model="toppingItem"
      />あらびきスライスソｰセｰジ</label>&nbsp;&nbsp;
      <label for='ブロッコリー'><input type="checkbox" id='ブロッコリー' value="ブロッコリー" v-model="toppingItem"/>ブロッコリー</label>&nbsp;&nbsp;
      <label for='グリーンアスパラ'><input type="checkbox" id='グリーンアスパラ' value="グリーンアスパラ" v-model="toppingItem"/>グリーンアスパラ</label>&nbsp;&nbsp;
      <label for='パルメザンチーズ'><input type="checkbox" id='パルメザンチーズ' value="パルメザンチーズ" v-model="toppingItem"/>パルメザンチーズ</label>&nbsp;&nbsp;
      <label for='パイナップル'><input type="checkbox" id='パイナップル' value="パイナップル" v-model="toppingItem"/>パイナップル</label>&nbsp;&nbsp;
      <label for='ハラペーニョ'><input type="checkbox" id='ハラペーニョ' value="ハラペーニョ" v-model="toppingItem"/>ハラペーニョ</label>&nbsp;&nbsp;
      <label for='もち'><input type="checkbox" id='もち' value="もち" v-model="toppingItem"/>もち</label>&nbsp;&nbsp;
      <label for='ポテト'><input type="checkbox" id='ポテト' value="ポテト" v-model="toppingItem"/>ポテト</label>&nbsp;&nbsp;
      <label for='ブラックオリーブ'><input type="checkbox" id='ブラックオリーブ' value="ブラックオリーブ" v-model="toppingItem"/>ブラックオリーブ</label>&nbsp;&nbsp;
      <label for='チーズ増量'><input type="checkbox" id='チーズ増量' value="チーズ増量" v-model="toppingItem"/>チーズ増量 </label>&nbsp;&nbsp;
      </div>
<p></p>
      <p id='total'>
      この商品の合計金額：{{ totalAmount() }} 円(税抜)    
      </p>

      <div id='kaimono'>
        <router-link :to="{name:'Cart'}"><button @click="addition" ><img src="../../public/pic/cart_green_mini.png" width=40px; height=40px>カートに入れる</button></router-link>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fitems: {},
      toppingItem:[],
      sizeModel:"",
      numberModel:"",
      error:"",
      error2:"",
      totalPrice:0,
      cartItem:[],
      addItem:{}
    };
  },
  methods: {
    addition(event){
        this.fitems.size = this.sizeModel
        this.fitems.topping = this.toppingItem
        this.fitems.number = this.numberModel
        this.fitems.total = this.totalPrice
        this.$store.state.pickupItem = {
          id:this.fitems.id,
          name:this.fitems.name,
          number:this.fitems.number,
          pic:this.fitems.pic,
          size:this.fitems.size,
          topping:this.fitems.topping,
          total:this.fitems.total
          }
          if (this.sizeModel === ""){
            this.error="サイズを入力してください"
          event.preventDefault()
          }
          if (this.numberModel=== ""){
            this.error2="個数を入力してください"
          event.preventDefault()
          }
          if(this.sizeModel !== "" && this.numberModel!== ""){
            this.editCartItem(this.$store.state.pickupItem)
          }
        // this.editCartItem(this.$store.state.pickupItem)
    },
    totalAmount(){
        if(this.sizeModel === "M"){
          return this.totalPrice = this.toppingItem.length * 200 + this.fitems.msizePrice * this.numberModel
        }else if(this.sizeModel === "L"){
            return this.totalPrice = this.toppingItem.length * 300 + this.fitems.lsizePrice * this.numberModel
        }
        },
    ...mapActions(["toppingChoice","editCartItem"]),
  },
    created(){
      const item = this.$store.getters.getCurryId(this.$route.params.item_id)
      this.fitems = item
    },
};

</script>
<style>
#picture{  
  width: 400px;
  height: 250px;
}

.explain{
  font-size: 5px;
}

#total{
  background: linear-gradient(transparent 45%, #F2BF18 70%);
  font-size: 20px;
  text-align: right;
}

input[type=radio] {
display: none; }


#picture{
  border-radius: 20px
}
.size {
  color:white;
  box-shadow: 0px 10px rgb(255, 140, 0);
  background-color: #F2BF18;
  border-right: solid 5px rgb(255, 140, 0);
  margin: 2em 0.5em;
}
/* .size:hover{
    cursor: pointer;
} */
.size:active {
  top:10px;
  position: relative;
  box-shadow: none;
  background-color: #F2BF18;
}




#title{  
  font-size: 200%;
  display: flex;
}
#kaimono{  
    padding: 0.5em 1em;
    margin: 2em 0;
    background:#F2BF18;
    border-bottom: solid 6px rgb(255, 140, 0);
    border-radius: 9px;
    width:200px;
    height:60px
}
#kaimono:active{
  top:10px;
  position: relative;
  box-shadow: none;
  background-color: #F2BF18;
}
.topping{
   font-size:15px;
    padding: 0.5em 1em;
    background: #fff8e8;
    border-left: solid 10px #F2BF18;
    color:dimgrey;
    
    }

.detail{
  font-family: 'Hannotate TC',sans-serif;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  margin: 0 2em;
}
</style>