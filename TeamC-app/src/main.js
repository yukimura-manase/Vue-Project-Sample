import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD6XoE8T9ZsEd4cF0DQHnBnKNiEHKVcaXA",
    authDomain: "team-c-project.firebaseapp.com",
    projectId: "team-c-project",
    storageBucket: "team-c-project.appspot.com",
    messagingSenderId: "622188827581",
    appId: "1:622188827581:web:7566455af91187a9b9b8d4",
    measurementId: "G-E223DYY1JQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // let STORAGE_KEY = 'curry-vue'
  // let curryStorage = {
  //   fetch: function (){
  //     let currys = JSON.parse(
  //       localStorage.getItem(STORAGE_KEY)||'[]'
  //     )
  //     currys.forEach((item,index) => {
  //       item.id =index
  //     })
  //     curryStorage.uid = currys.length
  //     return currys
  //   },
  //   save: function (currys){
  //     localStorage.setItem(STORAGE_KEY,JSON.stringify(currys))
  //   }
  // }


new Vue({
  router,
  store,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')
