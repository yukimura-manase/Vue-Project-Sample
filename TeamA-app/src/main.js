import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

  var firebaseConfig = {
    apiKey: "AIzaSyDhYsvzJjZ5AhB3jztD2Opml73rQViPPBE",
    authDomain: "cr-javascript.firebaseapp.com",
    projectId: "cr-javascript",
    storageBucket: "cr-javascript.appspot.com",
    messagingSenderId: "363192519527",
    appId: "1:363192519527:web:f822434afc42891a8abdc2",
    measurementId: "G-JNMGN1QGY5"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
