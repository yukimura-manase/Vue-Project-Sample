<template>
<div id="app">
  <v-app>
      <v-app-bar app color=#F2BF18 dark>
        <v-toolbar-title>
          <router-link to="/">
            <img src="/pic/header_logo.png">
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>       
            <v-toolbar-items>
              <v-btn text>
                <span class="mr-2"><router-link to="/Cart" class="linkColor">ショッピングカート</router-link></span>
              </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
            <v-btn text>
              <span class="mr-2"><router-link to="/Order" class="linkColor">注文履歴</router-link></span>
            </v-btn>
          </v-toolbar-items>      
          <div v-if="!$store.state.login_user">
             <router-link to="/">
                <v-toolbar-items>
                  <v-btn text @click="login" class="linkColor">ログイン</v-btn>
                </v-toolbar-items>
               </router-link>
          </div>
          <div v-if="$store.state.login_user">
            <v-toolbar-items>
              <router-link to="/"><v-btn text @click="logout" class="linkColor">ログアウト</v-btn></router-link>
            </v-toolbar-items>
          </div>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>

    <v-footer
      color=#F2BF18
      dark
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="dark lighten-2 py-4 text-center white--text"
          cols="12"
        >
          &copy;2021 202107FR_Vue開発演習_チームC
        </v-col>
      </v-row>
    </v-footer>
    </v-app>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import firebase from "firebase";


export default {
  name: 'App',
   created () {
   firebase.auth().onAuthStateChanged(user => {
     if (user) {
       this.setLoginUser(user)
       this.fecthCartItem()
       this.fetchOrderedItem()
     } else {
       this.deleteLoginUser()
       this.$store.state.cartlist={}
     }
    this.fetchItem()
   })
 },

  methods:{
...mapActions(['login','logout','setLoginUser', 'deleteLoginUser','fecthCartItem','fetchItem','fetchOrderedItem'])
}


};

</script>
<style>
.linkColor{
  text-decoration: none;
}
</style>