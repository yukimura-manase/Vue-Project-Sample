<template>
  <div class="about">

<!-- 検索画面 -->
  <table class="search" >
    <tr >
      <td>
        <h2>商品を検索する</h2>
        </td>
    </tr>
    <tr>
      <td >
        <label for='ItemName'>商品名&nbsp;</label>
      </td>
      <td>
        <input type="text" class="textbox" placeholder="ここに入力" id='ItemName' v-model='searchWord'>
      </td>
    </tr>
    <tr>
      <td class="btnDig2">
        <button  @click='search()' class="btnDig">&nbsp;&nbsp;&nbsp;&nbsp;検索&nbsp;&nbsp;&nbsp;&nbsp;</button> 
      </td>
      <td class="btnDig2">
        <button type="reset" @click="clearMozi()" class="btnDig">&nbsp;&nbsp;&nbsp;クリア&nbsp;&nbsp;&nbsp;</button>
      </td>
    </tr>
  </table>

<!-- 商品一覧表示 -->
    <v-app id="inspire">
      <div class="itemLists">
        <h1>商品一覧</h1>

        <div class="btnDig3_1">
          <button type="button" @click="ChengeTable" class="btnDig3">安い順</button>
          <button type="button" @click="ChengeTable2" class="btnDig3">高い順</button>

        </div>  

        <ul class="container" v-if="this.newCurry.length===0">
          <table v-for="(Item, index) in Curry" :key="index" >
            <tbody>
              <v-card>
                <tr>
                  <td><router-link :to="{name:'carryDetail',params: {item_id:Item.id}}"><v-img :src="Item.pic" id="picture"></v-img></router-link></td>
                </tr>
                <tr class="itemName">
                  <v-card-title><router-link :to="{name:'carryDetail',params: {item_id:Item.id}}" class="linkColor">{{Item.name}}</router-link></v-card-title>
                  <div>&nbsp;М&nbsp;&nbsp;&nbsp;{{Item.msizePrice}}円(税抜)</div>
                  <div>&nbsp;L&nbsp;&nbsp;&nbsp;{{Item.lsizePrice}}円(税抜)</div>
                </tr>
              </v-card>
            </tbody>
          </table>
        </ul>
        <ul class="container" v-if="this.newCurry.length!==0">
          <table v-for="(Item, index) in newCurry" :key="index" >    
            <tbody>
              <v-card>
                <tr>
                  <td><router-link :to="{name:'carryDetail',params: {item_id:Item.id}}"><v-img :src="Item.pic" id="picture"></v-img></router-link></td>
                </tr>
                <tr class="itemName">
                  <v-card-title><router-link :to="{name:'carryDetail',params: {item_id:Item.id}}" class="linkColor">{{Item.name}}</router-link></v-card-title>
                  <div>&nbsp;М&nbsp;&nbsp;&nbsp;{{Item.msizePrice}}円(税抜)</div>
                  <div>&nbsp;L&nbsp;&nbsp;&nbsp;{{Item.lsizePrice}}円(税抜)</div>
                </tr>
              </v-card>
            </tbody>
          </table>
        </ul>
      </div>   
    </v-app>
  </div>
</template>

<script>
export default{
  name: 'About',
  data(){
    return {
    Curry:[],
    searchWord:"",
    newCurry:[]
    }
  },
  methods:{
    search(){
      this.newCurry=this.Curry.filter(
        function (value) {
          if(value.name.indexOf(this.searchWord) > -1 ){
            return 1
          }
        },this
      )
      if(this.newCurry.length===0){
        alert("該当する商品がありません")
        this.searchWord=""
      }
    },
    clearMozi(){
      this.searchWord=""
    },
    ChengeTable(){
      return this.Curry.sort((a,b) =>{
        return a.msizePrice - b.msizePrice
      })
    },
    ChengeTable2(){
      return this.Curry.sort((a,b) =>{
        return b.msizePrice - a.msizePrice
      })
    }
  },
   
   
  created(){
    this.Curry=this.$store.state.itemList
  },
        }

</script>

<style>
h1{
 text-align: center;
 font-family: 'Hannotate TC',sans-serif;
 
 
}
.container{
    display:flex; 
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-evenly;
    width: auto;
    height:auto;
    padding: 5%;
}
#picture{
  
  width: 400px;
  height: 250px;
}

div{
  font-family: 'Hannotate TC',sans-serif;
  font-weight: 800;
}

.btnDig{
  background:#F2BF18;
    border-bottom: solid 6px rgb(255, 140, 0);
    border-radius: 9px;
    padding: 0.2em 2em;
    height:35px;
    margin-left: auto;
    margin-right: auto;
}
.btnDig:active{
  top:10px;
  position: relative;
  box-shadow: none;
  background-color: #F2BF18;
}
.btnDig3:active{
  top:10px;
  position: relative;
  box-shadow: none;
  background-color: #F2BF18;
}
.btnDig2{
  text-align: center;
}
.btnDig3{
  background:#F2BF18;
    border-bottom: solid 6px rgb(255, 140, 0);
    border-radius: 9px;
    width:80px;
    height:35px;
    margin-left: auto;
    margin-right: auto;
}
.btnDig3_1{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 15px;
}
.search{
  justify-content: center;
  margin-top: 50px;
   margin-left: auto;
    margin-right: auto;
    padding: 0.5em 1em;
    color: #474747;
    background: rgb(255, 255, 255);/*背景色*/
    border-left: double 7px rgb(255, 140, 0);/*左線*/
    border-right: double 7px rgb(255, 140, 0);/*右線*/


}
.itemLists{
  margin-top: 50px;

}
.itemName{
  background-color: #F2BF18;
  text-align: center;
}
.linkColor{
  text-decoration: none;
}
.textbox{
margin: 2em auto;
 padding: 1em;
 width: 90%;
 border: 3px dotted #F2BF18; /*太さ・線種・色*/
 background-color: #fff; /* 背景色 */
 border-radius: 1px; /*角の丸み*/

}
</style>