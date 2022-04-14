<template>
    <div class="container">    
        <button class="topButton" @click="backPage()"><img src="http://design-ec.com/d/e_others_40/e_others_408.png"></button>         
            <div>
                    <div class="topTitle">商品詳細</div>

                    <div class="container1">
                        <div class="pizzaTitle">商品名 : {{getPizzasById(this.$route.params.id).name}}</div>
                        <div class="pizzaImg"><img :src="require('../assets/img/img_pizza/' + getPizzasById(this.$route.params.id).image)"></div> 
                        <div class="explainTitle">説明  </div>
                        <div class="explain">{{getPizzasById(this.$route.params.id).explain}}</div>
                    </div>


                    <div class="container2">
                        <div>
                            <span class="valueTitle">値段 : </span>
                            <span class="valueM"><input type="radio" :value="getPizzasById(this.$route.params.id).priceM" name="size" id="M" @click="totalPrice()"><label for="M"> &nbsp;&nbsp;Mサイズ : {{getPizzasById(this.$route.params.id).priceM}} 円</label></span>
                            <span class="valueL"><input checked type="radio" :value="getPizzasById(this.$route.params.id).priceL" name="size" id="L" @click="totalPrice()"><label for="L"> &nbsp;&nbsp;Lサイズ : {{getPizzasById(this.$route.params.id).priceL}} 円</label></span>
                        </div>  
                        
                        <div class="toppingTitle">                  
                            トッピング<sup>※</sup>
                        </div>
                        <div class="toppingExplain">※ トッピング１つにつき、<span class="sizeString">  Mサイズは200 円、Lサイズは300 円</span>になります。</div>
                            <div class="toppingtype" v-for="item in getToppings" :value="getToppings" :key="item.id">
                                <input type="checkbox" name="topping" :value="item.id" :id="item.id" @click="totalPrice()">&nbsp;&nbsp;{{item.name}}   
                            </div>

                        <div class="selectNum" >
                            <label for="num" class="boxContainer">
                            <span class="number">枚数 :   </span>
                            <span class="number">
                                <select  name="num" id="num" class="form-control" @change="totalPrice()">
                                <option value="0">選択して下さい</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                </select>
                            </span>
                            </label>
                        </div>  
                    </div>

                    <div class="container3">                   
                        <div class="finalPriceTitle">
                            商品の合計金額  <input type="text" name="field_total" >
                        </div>

                        <div class="finalPriceTPattern">
                            <div>合計 : {{finalPrice[0]}} 円</div>
                            <div>( 消費税 : {{finalPrice[1]}} 円 )</div>
                            <div class="finalPriceTPattern3">税込価格 : {{finalPrice[2]}} 円</div>
                        </div>

                        <div class="cartButton">
                            <button @click="addPizza"><img src="http://design-ec.com/d/e_company_52/e_company_520.png"></button>
                        </div>     
                    </div>
                <div class="Page-Btn" @click="scrollTop">
                    <img class="scrollImg" src="https://jbit.bufs.ac.kr/~group2002s2/image/upmark.png">
                </div>
        </div>     
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
    data() {
        return {    
            pS: '', 
            tS: [],
            finalPrice: [],
            toppingPrice: 0,
            number:0,


        }
    },    
    computed:{
        ...mapGetters(['getPizzas','getToppings','getPizzasById', 'getToppingsById','getCartItems']),
        
        beeRoute(){
            return this.$route.params.currentName
        },
    },
    created(){
        if(!this.$route.params.id){
            this.$router.push({name:'Serch'})
        }
    },
    methods:{
        addPizza () {                            
            if(this.number <= 0){
                alert("個数を入力して下さい")
                return
            }                                           
            
            let sCIL = this.getCartItems.CartItem ? this.getCartItems.CartItem.cartItemList.concat() : []
            sCIL.push({
                pizzaid: this.$route.params.id,
                toppingid: this.tS,
                number: this.number,
                price:  this.pS,                
            })                                   
            this.setCartItemList(sCIL)
            this.$router.push ({name:"Cart"})                                      
            
        },
        totalPrice () {
            
            let tax = 0.10; //消費税                                                       
            let p = 0;                         

            let pizzaSize = document.getElementsByName("size"); //チェック済みのラジオボタンを調べて値を取得   

            for ( let i = 0; i < pizzaSize.length; i++ ) {
                if ( pizzaSize[i].checked ){
                    p = pizzaSize[i].value * 1;
                    if(pizzaSize[i].value == this.getPizzasById(this.$route.params.id).priceM){
                        this.pS = 'priceM'                        
                    }else if(pizzaSize[i].value == this.getPizzasById(this.$route.params.id).priceL){
                        this.pS = 'priceL'                         
                    }
                }
            }                   

            if(!this.pS){ return }
            
            let toppingSelect = document.getElementsByName("topping");
            let tS2 = [];            
            for ( let j = 0; j < toppingSelect.length; j++ ) {                
                if ( toppingSelect[j].checked ){                                                                          
                    p += this.getToppingsById(toppingSelect[j].value * 1)[this.pS] * 1;                    
                    tS2.push ( this.getToppings[j].id )                     
                }                
            }            
            this.tS = tS2            
            this.number = document.getElementById("num").selectedIndex
            
            let price = p * this.number ; // 数量×単価
            let tax2 = Math.round(price * tax); //消費税を計算
            let total2 = price + tax2; //税込み合計を計算                     
            //表示用の金額を3桁区切りに変換
            let data = new Array(price, tax2, total2); //金額が配列になる            

            //フォームのテキストエリアに表示する金額
            //date[] から取り出す
            this.finalPrice = data;
            
        },

        ...mapActions(['setCartItemList']), 

        backPage(){            
            if(this.beforeRoute){
                this.$router.push({ name:this.beforeRoute },()=>{});
            }else{
                this.$router.push({ name:"Serch" },()=>{});
            }
        },

        scrollTop: function () {
            window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    },
    }               
}

</script>

<style>
.topButton {
    margin-top: 2%;
    margin-left: 2%;
}
.topTitle {
    text-align: center;
    font-family: 'Hiragino Kaku Gothic StdN';
    font-size: 350%;
    color: rgb(138, 126, 101);
}
.pizzaTitle {
    text-align: center;
    font-family: 'Hiragino Kaku Gothic StdN';
    font-size: 250%;
}
.pizzaImg {
    width: 100%;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 10%;
}
.explainTitle {
    font-family: 'Hiragino Kaku Gothic StdN';
    font-size: 150%;
}


.valueTitle {
    font-family: 'Hiragino Kaku Gothic StdN';
    font-size: 120%;
}
.valueM {
    margin-left: 1%;
}
.valueL {
    margin-left: 2%;
}


.toppingTitle {
    font-family: 'Hiragino Kaku Gothic StdN';
    margin-top: 3%;
    font-size: 120%;
}
.toppingExplain {
    margin-left: 2%;
    margin-bottom: 2%;
    text-decoration : underline;
}
.sizeString {
    font-weight: bold;
}
.toppingtype {
    margin-left: 4%;
}
.selectNum {
    margin-top: 5%;
    font-size: 120%;
    margin-left: 35px;
}
.numbers {
    margin-right: 2%;
    
}
.number {
    font-weight: bold;
    float: left;
    font-size: 23px;
    border-radius: 2%;
}

.finalPriceTitle {
    font-family: 'Hiragino Kaku Gothic StdN';
    font-size: 150%;
    margin-left: 5%;
    margin-top: 3%;

}
.finalPriceTPattern {
    font-size: 120%;
    margin-top: 5%;
    margin-left: 15%;
    font-weight: bold;
}
.finalPriceTPattern3 {
    margin-top: 3%;
    font-size: 130%;
}



.container {
    display: frex;
}
.container1 {
    display: frex;
    background-color: rgb(253, 249, 239);
    margin-top: 3%;
    width: 100%;
    padding: 5%;
    border-radius: 10%;
}
.container2 {
    background-color: rgb(253, 249, 239);
    margin-top: 3%;
    width: 100%;
    padding: 5%;
}
.container3 {
    background-color: rgb(253, 249, 239);
    margin-top: 3%;
    width: 100%;
    padding: 5%;
}
.cartButton {
    margin-top: 10%;
    margin-right: 10%;
    margin-bottom: 5%;
    text-align: right;
}

.form-control {
    background: #fff;
    border: 1px solid #dedede;
    border-radius: 2%;
  /* height: calc(1.5rem + 1rem + 2px); */
  /* line-height: 1.5; */
    padding: 0.5rem 0.75rem;
    width: 20%;
}

.form-control:focus {
    outline: 0;
    border-color: #f8f7eb;
}

.Page-Btn {
    position: fixed;
    right: 7%;
    bottom: 12%;
    width: 20px;
    height: 30px;
}
.scroll {
    color: rgb(241, 237, 233);
}
.scrollImg {
    width: 300%;
}

.boxContainer{
  overflow: hidden;
}
#id{
    font-size: 15px;
    
}


</style>