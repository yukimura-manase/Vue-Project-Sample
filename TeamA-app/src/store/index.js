import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const initialState = {
  login_user: null,
  drawer: false,  
  userExist:false,  
  CartItems:{},  
  BuyItems:[],
  Pizzas:[],
  Toppings:[],
  midLogin:false,  
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    toggleSideMenu(state){
      state.drawer = !state.drawer;
    },
    setLoginUser(state, user){
      state.login_user = user //ログインユーザー情報をstateのlogin_userにセット
    },
    deleteLoginUser(state){
      state.login_user = null //ログインユーザー情報(stateのlogin_user)を空にする
      state.CartItems = { CartItem:{ cartItemList:[] }}  //ログアウト時にリセット
    },    
    setCartItems(state, CItems){
      state.CartItems = CItems 
    },    
    setCartItemList(state, CItemList){      
      state.CartItems.CartItem.cartItemList = CItemList      
    },
    fetchItems(state, Item){            
      state.Pizzas = Item.Pizza || state.Pizzas
      state.Toppings = Item.Tooping || state.Toppings      
    },
    fetchCarts(state, Items){
      if(Items.CartItem.status == 0 ){ state.CartItems = Items }
      else if(Items.CartItem.status == 1 || Items.CartItem.status == 2){
        state.BuyItems.push(Items) }
    },
    setBuyItem(state, carts){            
      state.BuyItems.push(carts)
    },
    setMidLogin(state, midBoolean){
      state.midLogin = midBoolean
    }
  },
  actions: {
    toggleSideMenu({ commit }){
      commit("toggleSideMenu")
    },
    setLoginUser({ commit }, user){
      commit('setLoginUser', user) //mutationのログイン情報登録を呼び出し
    },
    login({ commit }, midBoolean) {
      commit("setMidLogin",midBoolean)
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
      window.localStorage.removeItem('vuex');
    },
    logout() {
      firebase.auth().signOut()
      window.localStorage.removeItem('carts');
      window.localStorage.removeItem('vuex');
    },
   
    deleteLoginUser({ commit }){
      commit('deleteLoginUser') //mutationのログイン情報削除の呼び出し
    },

    fetchItems({ commit }){      
      firebase.firestore().collection(`Items`).get().then( querySnapshot => {                
        querySnapshot.forEach( doc => {             
          commit('fetchItems', doc.data())              
        })        
      })
    },

    fetchCarts( { getters, commit }){            
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/carts`).get().then( querySnapshot => {              
          if(querySnapshot.empty){             
            console.log('empty');           
            this.dispatch('initSetCarts') 
            commit('setMidLogin',false)
            querySnapshot.forEach( doc => {                   
              commit('fetchCarts', { CartItem: doc.data(), id: doc.id })
            })
          }       
          //データ登録が初めてじゃなくて、途中でログインした場合                    
          else if(JSON.parse(window.localStorage.getItem("carts")).midLogin){                      
            querySnapshot.forEach( doc => {  
              let lSCIL = JSON.parse(window.localStorage.getItem("carts")).CartItems.CartItem.cartItemList 
              commit('fetchCarts', { CartItem: doc.data(), id: doc.id }) 

              // cartの場合                
              if(doc.data().status == 0){                
                console.log('cart');
                this.dispatch('setCartItemList', lSCIL )
              }                 
            })                          
            commit('setMidLogin',false)
          }else{
            querySnapshot.forEach( doc => {                   
              commit('fetchCarts', { CartItem: doc.data(), id: doc.id })
            })        
          }          
        })
      }
    },
    addCarts({ getters, commit }, cart ){
      const carts = cart
      carts.cartItemList = getters.getCartItems.CartItem.cartItemList      

      if(getters.uid){ 
        firebase
          .firestore()
          .collection(`users/${getters.uid}/carts`) 
          .doc(getters.getCartItems.id)         
          .update(carts)          
          .then( () => {         
            this.dispatch('initSetCarts')             
            commit("setBuyItem", { id: getters.getCartItems.id, CartItem: carts });
          });
      }
    },

    setCartItemList({ getters, commit }, cartItemList ){
      if(getters.uid){        
        firebase
          .firestore()
          .collection(`users/${getters.uid}/carts`)
          .doc(getters.getCartItems.id)
          .update({ cartItemList })          
          .then( () => {                      
            commit("setCartItemList", cartItemList );
          });
      }else{ //ログインしてなくてもstoreに保存
        console.log('not login');
        commit("setCartItemList", cartItemList );
      }
    },
    
    initSetCarts({ getters, commit }){ 
      //データ登録が初めてで、途中でログインした場合            
      let cIL = []
      if(JSON.parse(window.localStorage.getItem("carts")).midLogin){         
        cIL = cIL.concat(JSON.parse(window.localStorage.getItem("carts")).CartItems.CartItem.cartItemList)
      }       
      console.log(cIL);          
      if(getters.uid){
        const initCart = {
            orderDate:'',
            orderTime:14,
            name:'大谷',
            email:'ootani@gmail.com',
            addNumber:'342-4422',
            address:'アメリカ合衆国ロサンゼルス州',
            tel:'080-2372-2322',
            status:0,
            cartItemList:cIL
        }
        firebase
          .firestore()
          .collection(`users/${getters.uid}/carts`) 
          .add(initCart)
          .then( (d) => {            
            commit("setCartItems", { id: d.id, CartItem: initCart } );
          });
      }
    },
  },
  getters:{
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',    
    uid: state => state.login_user ? state.login_user.uid : null,    
    midLogin: state => state.midLogin,

    getPizzas: state => state.Pizzas ,
    getToppings: state => state.Toppings ,     

    getPizzasById: state => id => state.Pizzas.filter( i => id === i.id)[0] ,
    getToppingsById: state => id => state.Toppings.filter( i => id === i.id)[0] ,
    getCartItems: state => state.CartItems ,    
    getBuyItems: state => state.login_user ? state.BuyItems : [],    
  },
  plugins: [createPersistedState({
      key: 'carts',
      paths: ['CartItems','midLogin'],
      storage: window.localStrage
  })]
})
