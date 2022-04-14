<template>
  <v-app>
    <v-app-bar app color="orange" dark>      
      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>      
      <v-toolbar-title :tile="true"><img :src="require('./../src/assets/img/img_pizza/header_logo.png')" alt="logo"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
      :size="70"
      :width="7"
      color="white"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <v-toolbar-items>
        <v-btn text @click="shop()" class="moji">ショッピングカート</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout" class="moji">ログアウト</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn text @click="login(false)" class="moji">ログイン</v-btn>
      </v-toolbar-items>
    </v-app-bar>    
    
    <SideNav />
    <v-content>
      <v-container fluid fill-height align-start>
        <router-view/>
      </v-container>
    </v-content>  
    </v-app>
</template>

<script>
import SideNav from "./components/SideNav.vue"
import { mapActions, mapGetters } from "vuex"
import firebase from 'firebase'

export default {
  name: 'App',
  components:{
    SideNav
  },
  data(){
    return {
      loading:false,
    }
  },
  created(){
    this.start()
  },
  computed:{
    ...mapGetters(['uid','getCartItems'])
  },
  methods:{
    ...mapActions(["toggleSideMenu", "setLoginUser", "logout", "login", "deleteLoginUser",
     "fetchItems","fetchCarts"]),
    
    start(){
      this.fetchItems();
      this.loading = true      
      firebase.auth().onAuthStateChanged( user => {
        if(user){
          this.setLoginUser(user);                    
          this.fetchCarts();
        }else{            
          this.deleteLoginUser();
          this.$router.push({ name: 'Serch'})                             
        }
        this.loading = false             
      })        
    },
    shop(){
     this.$router.push({name:'Cart'})
    },
  }
};
</script>
<style scoped>
.moji{
  font-size: 14px;
  font-weight: bold;
}

</style>
