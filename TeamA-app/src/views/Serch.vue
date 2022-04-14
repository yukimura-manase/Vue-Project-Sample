<template>
  <div class="home">
    <v-content>
            <!-- <div class="serchForm">                 -->
      
              <h2 class="p">商品を検索する</h2>

              <!-- <form class="search"> -->
              <input v-model="serchWord" placeholder="検索したいメニューを入力して下さい" size="35" class="kensaku">
              <button @click="searchItems" class="reserch">検索</button>
              <button @click="kuria" class="kuria">クリア</button>
                <!-- </form> -->

              <h3 class="i" v-if="pi.length">商品一覧</h3><h5 class="zeikomi">※表示価格は税込価格です</h5>
              <h5 class="sen">商品数：１８個</h5>

              <div v-if="pi[pi.length - 1].last" class="nasi">該当する商品がありません</div>
              <div v-if="pi[pi.length - 1].last" class="nasi">内容にお間違いがないかもう一度ご確認ください</div>
              <div class="container">
                <div v-for="piza in pi" :key="piza.name" class="piza">
                 
                <div @click="searchItems(piza)">   
                  <div class="container1">                      
                    <v-card elevation="2">                             
                      <div class="w">{{piza.name}}</div>                      
                      <div  @click="submit(piza.id)" class="pic"><img class="itemImg" :src="require('../assets/img/img_pizza/' + piza.image)"></div>
                      <div class="menu">Lサイズ：{{piza.priceL}}円</div>
                      <div class="menu">Mサイズ：{{piza.priceM}}円</div>
                      <button class="btn btn-danger" @click="submit(piza.id)">詳細表示</button>                                                     
                    </v-card>           
                  </div>         
                </div>
              </div>      
        </div>   
    </v-content>     
  </div>
  
</template>

<script>
import { mapGetters } from "vuex"

  export default {
    name: 'Serch',
    data(){
        return{
            serchWord:'',  
            sW:'',
            //検索したものを表示
            p:[],
            pEmpty:false                        
        }
    },    
    methods:{
        kuria(){                        
          this.serchWord=''
        },
        submit(id){
          this.$router.push({name:"ItemDetail",params:{id}})//省略id:idと同じ
        },
        
        searchItems(){ //検索処理の関数
          this.sW = this.serchWord
        },                

        getItem(id){
          this.$router.push({ name: "ItemDetail", params:{ id: id } })
        },  
         
    },
    computed:{
        ...mapGetters(['getPizzas','getToppings']),
        pi(){          
          if(this.sW==''){            
            return [].concat(this.getPizzas)
          }
          else{
            let gpl = this.getPizzas.filter(piza=>{
              return piza.name.indexOf(this.sW)>=0
            })

            if(gpl.length === 0){ 
              gpl = gpl.concat(this.getPizzas)
              gpl[gpl.length - 1].last = true
              return gpl }
            else{ return gpl } 
          }
        },}}
      
</script>

<style scoped>
.sen{
  border-bottom:2px solid #ffbf1f;
  text-align: right;
}
.zeikomi{
  text-align: right;
}
.pic{
  cursor: pointer;
}
.pic:hover{
  border-style:solid
}
.itemImg{
  width: 100%;
  height: 100%;
}
.container{
  display:flex;
  background-color: rgb(253, 249, 239);
  flex-wrap: wrap;
}
.container1{
  margin: 2px;
  align-content: stretch;
} 
.piza{
  width: 23vw;  
}
.kensaku{
  outline:0;/*クリック時の青い枠線消す*/	
  height:7vh;/*検索ボックスの高さ*/	
  padding:0 10px;/*テキスト位置調整*/	 
  border-radius:2px 0 0 2px;/*検索ボックスの角を丸める*/		
  background:#eee;/*検索ボックスの背景カラー*/		
  cursor:pointer
}
.kensaku:hover{
  border-style:solid
}
.reserch{
  width:7vw;/*検索ボタンの横幅*/ 
  height:7vh;/*検索ボタンの縦幅*/   
  border-radius:0 2px 2px 0;/*検索ボタンの角を丸める*/ 
  background:#7fbfff;/*検索ボタンの背景カラー*/ 
  border:none;/*検索ボタンの枠線を消す*/ 
  color:#fff;/*検索ボタンのテキストカラー*/ 
  font-weight:bold;/*検索ボタンのテキスト太字*/ 
  font-size:16px;/*検索ボタンのフォントサイズ*/   
}
.reserch:hover{
  border-style:solid
}
.kuria:hover{
  border-style:solid
}
.kuria{
  width:7vw;/*検索ボタンの横幅*/ 
  height:7vh;/*検索ボタンの縦幅*/       
  border-radius:0 2px 2px 0;/*検索ボタンの角を丸める*/ 
  background:plum;/*検索ボタンの背景カラー*/ 
  border:none;/*検索ボタンの枠線を消す*/ 
  color:#fff;/*検索ボタンのテキストカラー*/ 
  font-weight:bold;/*検索ボタンのテキスト太字*/ 
  font-size:16px;/*検索ボタンのフォントサイズ*/ 
}
.w{
  color:#ed1c24;
  font-family:"cursive";
  font-size: 18px;
  font-weight: 900;
  margin:auto
}
.nasi{
  font-size:20px
}
.menu{
  color: #666;
  text-shadow:0px 0px 1px #FFF, 2px 2px 1px rgba(0,0,0,0.3);
  font-weight: bolder;  
}
</style>
