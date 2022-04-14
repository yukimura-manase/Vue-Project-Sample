<template>
  <div id="Check">
    <h1>注文内容確認</h1>

    <!-- <table  v-if="this.customerInfo.cartItemList.length" id='confirm-table'> -->
      <table>
      <thead>
      <tr>
        <th class='table-head'>商品名</th>
        <th class='table-head'>サイズ</th>
        <th class='table-head'>数量</th>
        <th class='table-head'>トッピング</th>
        <th class='table-head'>小計</th>
      </tr>
      </thead>

      <tbody v-for="(item, index) in customerInfo.cartItemList" :key="index">
        <tr>
            <td class='table-body'><img :src="item.pic" class="img">
              <div>{{item.name}}</div>
            </td>
            <td class='table-body'>{{item.size}}</td>
            <td class='table-body'>{{item.number}}個</td>
            <td class='table-body'><div v-for="(item1, index) in item.topping" :key="index">{{item1}}</div></td>
            <td class='table-body'>{{item.total}}円</td>
       </tr>
      </tbody>
    </table>
    <div>消費税:{{totalTax()}}円</div>
    <div id='total'>ご注文合計金額:{{total()}}円</div>
    <p></p>
    <div class='explain'>ご注文内容をご確認の上お届け先情報とお支払い方法を入力してください</div>
    <h3>&nbsp;&nbsp;<img src="../../public/pic/home.png" width=30px; height=30px>お届け先情報</h3>
    <table>

      <tr>
        <td class='table-head'>お名前</td>
        <td class='table-body'>
          <div class="message" v-if="!customerInfo.userName">
            {{ errorText.name }}
          </div>
          <input type="text" name="name" placeholder="ラクス太郎" v-model="customerInfo.userName"/>
        </td>
      </tr>
      <tr>
        <td class='table-head'>メールアドレス</td>
        <td class='table-body'>
          <div class="message" v-if="!customerInfo.mailAddress">
            {{ errorText.email }}
          </div>
          <div class="message" v-if="(!this.email.test(customerInfo.mailAddress))&&customerInfo.mailAddress">
            {{ errorText.email }}
          </div>
          <input type="text" name="email" placeholder="xxx@example.co.jp" v-model="customerInfo.mailAddress"/>
        </td>
      </tr>
      <tr>
        <td class='table-head'>郵便番号</td>
        <td class='table-body'>
          <div class="message" v-if="!customerInfo.addressNumber">
            {{ errorText.addressnum }}
          </div>
          <div class="message" v-if="(!this.addressnum.test(customerInfo.addressNumber))&&customerInfo.addressNumber">
            {{ errorText.addressnum }}
          </div>
          <input type="text" name="addressnum" placeholder="xxx-xxxx" v-model="customerInfo.addressNumber"/>
          <button>住所検索</button>
        </td>
      </tr>
      <tr>
        <td class='table-head'>住所</td>
        <td class='table-body'>
          <div class="message" v-if="!customerInfo.address">
            {{ errorText.address }}
          </div>
          <input type="text" name="address" placeholder="〇〇県〇〇市〇〇番地" v-model="customerInfo.address"/>
        </td>
      </tr>
      <tr>
        <td class='table-head'>電話番号</td>
        <td class='table-body'>
          <div class="message" v-if="!customerInfo.phoneNumber">
            {{ errorText.tel }}
          </div>
          <div class="message" v-if="(!this.tel.test(customerInfo.phoneNumber))&&customerInfo.phoneNumber">
            {{ errorText.tel }}
          </div>
          <input type="text" name="tel" placeholder="xxx-xxxx-xxxx" v-model="customerInfo.phoneNumber"/>
        </td>
      </tr>
      <tr>
        <td class='table-head'>配達日時</td>
        <td class='table-body'>
          <div class="message" v-if="!customerInfo.deliveryDate">
            {{ errorText.date }}
          </div>
          <div class="message" v-if="customerInfo.deliveryDate&&selectDay<today">
            {{ errorText.date }}
          </div>
          <div>
            <input type="date" name="date" v-model="customerInfo.deliveryDate" />
          </div>
          <div>
            <div class="message" v-if="!customerInfo.deliveryTime">
              {{ errorText.time }}
            </div>
            <div class="message" v-if="(customerInfo.deliveryTime<hour+3)&&customerInfo.deliveryTime">
              {{ errorText.time }}
            </div>
            <input type="radio" name="time" value="10" style="display:inline" v-model="customerInfo.deliveryTime"/>10時
            <input type="radio" name="time" value="11" style="display:inline" v-model="customerInfo.deliveryTime"/>11時
            <input type="radio" name="time" value="12" style="display:inline" v-model="customerInfo.deliveryTime"/>12時
          </div>
          <div>
            <input type="radio" name="time" value="13" style="display:inline" v-model="customerInfo.deliveryTime"/>13時
            <input type="radio" name="time" value="14" style="display:inline" v-model="customerInfo.deliveryTime"/>14時
            <input type="radio" name="time" value="15" style="display:inline" v-model="customerInfo.deliveryTime"/>15時
          </div>
          <div>
            <input type="radio" name="time" value="16" style="display:inline" v-model="customerInfo.deliveryTime"/>16時
            <input type="radio" name="time" value="17" style="display:inline" v-model="customerInfo.deliveryTime"/>17時
            <input type="radio" name="time" value="18" style="display:inline" v-model="customerInfo.deliveryTime"/>18時
          </div>
        </td>
      </tr>
    </table>
    <h3>&nbsp;&nbsp;<img src="../../public/pic/money.png" width=30px; height=30px>お支払い方法</h3>
    <div class="message" v-if="!customerInfo.status">
      {{ errorText.status }}
    </div>
    <table id='confirm-table'>
      <tr>
        <td class='table-head'>代金引換</td>
        <td class='table-body'>
          <input type="radio" name="pay" id='hikikae' value="1" style="display:inline" v-model="customerInfo.status"/><label for='hikikae'>代金引換</label>
        </td>
      </tr>
      <tr>
        <td class='table-head'>クレジットカード決済</td>
        <td class='table-body'>
          <input type="radio" name="pay" id='cc' value="2" style="display:inline" v-model="customerInfo.status"/><label for='cc'>クレジットカード</label>
        </td>
      </tr>
    </table>
    <p></p>
    <button @click="checkInfo()" id='confirm'><img src="../../public/pic/cart_green_mini.png" width=40px; height=40px>この内容で注文する</button>
    <!-- <div>{{ customerInfo }}</div> -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Check",
  data() {
    return {
      customerInfo: "",
      errorText: {
        name: "",
        email: "",
        addressnum: "",
        address: "",
        tel: "",
        date: "",
        time: "",
        status: "",
      },
      addressnum : /^[0-9]{3}-[0-9]{4}$/,
      email:/^[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9._-]+$/,
      tel:/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,

      hour:12,
      // hour:new Date().getHours()
    };
  },
  created() {
    this.customerInfo = this.$store.state.orderList[0];
  },
  computed:{
    selectDay(){
      return Number(`${new Date(this.customerInfo.deliveryDate).getFullYear()}`+`${new Date(this.customerInfo.deliveryDate).getMonth()+1}`+`${new Date(this.customerInfo.deliveryDate).getDate()}`)
    },
    today(){
      return Number(`${new Date().getFullYear()}`+`${new Date().getMonth()+1}`+`${new Date().getDate()}`)
    }
  },
  methods: {
            totalTax(){
            let total = []
            this.customerInfo.cartItemList.forEach(ele => {
              total.push(ele.total * 0.1)
            });
            let totalTax =total.reduce((sum,element) => {
                return sum + element;
            },0)
            return totalTax
        },
        total(){
            let total = []
            this.customerInfo.cartItemList.forEach(ele => {
              total.push(ele.total *1.1)
            })
            let totals = total.reduce((sum,element) => {
                return sum + element;
            },0)
            return Math.floor(totals)
        },
    checkInfo() {
      if (!this.customerInfo.userName) {
        this.errorText.name = "お名前を入力して下さい";
      } else {
        delete this.errorText.name;
      }

      if (!this.customerInfo.mailAddress) {
        this.errorText.email = "メールアドレスを入力して下さい";
      } else {
        if (this.email.test(this.customerInfo.mailAddress)) {
          delete this.errorText.email;
        } else {
          this.errorText.email = "メールアドレスの形式が不正です";
        }
      }

      if (!this.customerInfo.addressNumber) {
        this.errorText.addressnum = "郵便番号を入力して下さい";
      } else{
        if (this.addressnum.test(this.customerInfo.addressNumber)) {
          delete this.errorText.addressnum;
        } else {
          this.errorText.addressnum = "郵便番号の形式が不正です";
        }
      }

      if (!this.customerInfo.address) {
        this.errorText.address = "住所を入力して下さい";
      } else {
        delete this.errorText.address;
      }

      if (!this.customerInfo.phoneNumber) {
        this.errorText.tel = "電話番号を入力して下さい";
      } else{
        if (this.tel.test(this.customerInfo.phoneNumber)) {
          delete this.errorText.tel;
        } else {
          this.errorText.tel = "電話番号の形式が不正です";
        }
      }

      if (!this.customerInfo.deliveryDate) {
        this.errorText.date = "配達日時を入力して下さい";
      } else if(this.customerInfo.deliveryDate&&this.selectDay<this.today){
        this.errorText.date = "今日以降の日付を入力して下さい";
      } else {
        delete this.errorText.date;
        if (!this.customerInfo.deliveryTime) {
          this.errorText.time = "配達時間を指定して下さい";
        } else if(this.customerInfo.deliveryTime&&(this.customerInfo.deliveryTime<this.hour||this.customerInfo.deliveryTime<this.hour+3)){
          this.errorText.time = "現在から3時間以降を指定して下さい";
        } else{
          delete this.errorText.time;
        }
          }
      
      if (!this.customerInfo.status) {
        this.errorText.status = "お支払い方法を選択して下さい";
      } else {
        delete this.errorText.status;
      }

      if (Object.keys(this.errorText).length) {
        return;
      } else {
        if(this.$store.state.login_user){
        this.customerInfo.orderDate=`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`
        this.addCustomerInfo(this.customerInfo);
        this.$router.push({ name: "Done" });
        } else{
          this.login()
        }
      }
    },
    ...mapActions(['addCustomerInfo','setCart','login'])
  },
};
</script>

<style>
.message {
  color: red;
}
#Check{
  font-family: 'Hannotate TC',sans-serif;;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  margin: 0 2em;
}

h3{
  background-color: darkorange;
  margin-top: 2em; 
  width:350px;
  border-bottom: solid 6px #F2BF18;
  vertical-align: top; 
  border-top-left-radius: 10px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 30px;
  color:white
}

#confirm{  
    padding: 0.5em 1em;
    margin: 2em 0;
    background:#F2BF18;
    border-bottom: solid 6px rgb(255, 140, 0);
    border-radius: 9px;
    width:250px;
    height:60px;
    align-items: flex-end;
}
#confirm:active{
  top:10px;
  position: relative;
  box-shadow: none;
  background-color: #F2BF18;
}
.confirm-table{
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border-collapse: collapse;
  width: 600px;
  border-collapse:separate;
  border-spacing: 0;
  border-radius: 4px;
}
input:checked + label{
  color: red;
}

</style>