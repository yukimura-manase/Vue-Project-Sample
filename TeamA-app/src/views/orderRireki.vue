<template>
    <div id="list">

        <h1>注文履歴画面</h1>
        <div>注文したものの履歴が表示されるページ</div>
        <div class="container">
			<div><button v-on:click="kakunin" >コンソールで確認ボタン</button>
			<p>{{this.getPizzas[0].name}}</p></div>
		<!-- <nav class="navbar navbar-default">
			<div class="container-fluid"> -->
				<!-- Brand and toggle get grouped for better mobile display -->
				<!-- <div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
						aria-expanded="false">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="">  
                        <img alt="main log" src="" height="35">
					</a>
				</div> -->

				<!-- Collect the nav links, forms, and other content for toggling -->
				<!-- <div class="collapse navbar-collapse"
					id="bs-example-navbar-collapse-1">
					<p class="navbar-text navbar-right">
						<a href="" class="navbar-link">ショッピングカート</a>&nbsp;&nbsp;
						<a href="" class="navbar-link">注文履歴</a>&nbsp;&nbsp;
						<a href="" class="navbar-link">ログイン</a>&nbsp;&nbsp;
						<a href="" class="navbar-link">ログアウト</a>
					</p>
				</div> -->
				<!-- /.navbar-collapse -->
			<!-- </div> -->
			<!-- /.container-fluid -->
		<!-- </nav> -->


		<!-- table -->
		<div class="row">
			<div
				class="table-responsive col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
				<h3 class="text-center">ショッピングカート</h3>
				<table class="table table-striped item-list-table"   >
					<tbody >
						<tr>
							<th>
								<div class="text-center">
									商品名
								</div>
							</th>
							<th>
								<div class="text-center">
									サイズ、価格(税抜)、数量
								</div>
							</th>
							<th>
								<div class="text-center">
									トッピング、価格(税抜)
								</div>
							</th>
							<th>
								<div class="text-center">
									小計
								</div>
							</th>
							<th>
								<div class="text-center">
									決済状態
								</div>
							</th>
						</tr>

                        
						<tr v-for="(item,i) in items" :key="item.name">
							<td>
								<div class="center">
									<!-- <img src=""
										class="img-responsive img-rounded item-img-center" width="100" height="300"><br> -->
									{{item.name}}
								</div>
							</td>
							<td>
								<span class="price">&nbsp;{{item.size}}</span>&nbsp;&nbsp;{{item.price}}円
								&nbsp;&nbsp;{{item.ko}}個
							</td>
							<td>
								<ul >
									<li v-for="(tp,ii) in item.top" :key="ii">{{tp.name}}{{tp.price}}</li>
									
								</ul>
							</td>
							<td>
								<div class="text-center" >
                                    
							合計金額 {{item.price+topPrice(i)}}円
								</div>
							</td>
							<td>
								<div class="text-center" >
									代金引換の場合は「1:未入金」・クレジットカード決済の場合は「2:入金済」になっていること
								</div>
							</td>
							
						</tr>


				


					</tbody>
				</table>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-offset-2 col-xs-8">
				<div class="form-group text-center">
                    <span id="total-price">税抜き金額合計：{{sumPrice}}円</span><br>
					<span id="total-price">消費税：{{taxP}}円</span><br>
					<span id="total-price">ご注文金額合計：{{taxP+sumPrice}}円</span>
				</div>
			</div>
		</div>

		
	</div>
	<!-- end container -->

    <div>
			<div class="row">
				<div
					class="table-responsive col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
					<h3 class="text-center">お届け先情報 ※履歴画面に必要か？</h3>
					<table class="table table-striped item-list-table">
						<tbody v-for="human in humans" :key="human.name">
							<tr>
								<td>
									<div class="text-center">
										お名前
									</div>
								</td>
								<td>
									<input type="text" v-model="human.name">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center" >
										メールアドレス
									</div>
								</td>
								<td>
									<input type="text" v-model="human.email">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										郵便番号
									</div>
								</td>
								<td>
									<input type="text" v-model="human.addNumber">&nbsp;&nbsp;<button>住所検索</button>
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										住所
									</div>
								</td>
								<td>
									<input type="text" v-model="human.address">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										電話番号
									</div>
								</td>
								<td>
									<input type="text" v-model="human.tel">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										配達日時
									</div>
								</td>
								<td>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-12">
												<label
													class="control-label" style="color: red" for="inputPeriod">配達日時を入力してください</label>
											</div>
											<div class="col-sm-5">
												<input type="date" name="name" id="name"
													class="form-control input-sm" v-model="human.orderDate"/>
											</div>

										</div>
										<form>
										<div class="row">
											<div class="col-sm-12" >
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" checked="checked" value="10" v-model="human.orderTime">
													10時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="11" v-model="human.orderTime">
													11時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="12" v-model="human.orderTime">
													12時
												</label><br>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="13" v-model="human.orderTime">
													13時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="14" v-model="human.orderTime">
													14時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="15" v-model="human.orderTime">
													15時
												</label><br>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="16" v-model="human.orderTime">
													16時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="17" v-model="human.orderTime">
													17時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="18" v-model="human.orderTime">
													18時
												</label><br>
											</div>
										</div>
										</form>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
    </div>
			<!-- table -->
    <div>
			<div class="row2">
				<div
					class="table-responsive col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
					<h3 class="text-center">お支払い方法</h3>
					<table class="table table-striped item-list-table" >
						<tbody v-for="human in humans" :key="human.name" id="target">
							<tr>
								<td>
									<div class="text-center">
										代金引換
									</div>
								</td>
								<td>
									<div class="row">
										<div class="col-sm-12">
											<label class="radio-inline">
												<input type="radio"
													name="responsibleCompany" checked="checked" value=1 v-model="human.status">
												代金引換
											</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										クレジットカード決済
									</div>
								</td>
								<td align="center">
									<div class="row">
										<div class="col-sm-12">
											<label class="radio-inline">
												<input type="radio"
													name="responsibleCompany" value=2 v-model="human.status">
												クレジットカード
											</label><br><br>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

		<div class>
			<div class="col-xs-offset-5 col-xs-3">
				<div class="form-group">

					<div>
						<button class="form-control btn btn-warning btn-block"  v-on:click="checkFrom">
							注文する
						</button>
					</div>
				</div>
                <p>注文するを押すと注文されましたというリザルト画面が出る（表示される内容は考える）</p>
				<p>{{Validation.userResult}}</p>
			</div>
		</div>
	</div>
	</div>
        
        
    
</template>

<style src="../../public/css/bootstrap.css"></style>
 <style src="../../public/css/piza.css"></style>

<script>

 import { mapGetters } from "vuex"

export default {
 data () {
   return {
     items: [
       { name:'じゃがバターベーコン', size:'L', price:3000, ko:1,
       top: [ {id:1,name:'ピーマン',price:300},
              {id:2,name:'オニオン',price:300},
              {id:3,name:'サラミ',price:300}],
        result:''
       },

       { name:'マルゲリータ', size:'L', price:3000, ko:1,
       top:[{name:'ピーマン',price:300},{name:'オニオン',price:300},{name:'サラミ',price:300}],
        result:''
       },
       { name:'ペパロニ', size:'L', price:3000, ko:1,
       top:[{name:'ピーマン',price:300},{name:'オニオン',price:300},{name:'サラミ',price:300}],
        result:''
       },
      
     ],
     humans:[
         {orderDate:'2021-2-18',
            orderTime:21,
            name:'大谷',
            email:'ootani@gmail.com',
            addNumber:'342-4422',
            address:'アメリカ合衆国ロサンゼルス州',
            tel:'080-2372-2322',
			status:0,
			
			}
	],
	
	Validation:{
	userResult :""
	}
   }
 },
  computed:{

	...mapGetters(['getPizzas','getToppings','getCartItems','getSelectItem']),
	
     topPrice(){
            return(index)=>{
                let total1=0;
           
                for (let ii = 0; ii < this.items[index].top.length; ii++) {
                    // for (let iii = 0; iii <this.items[i].top[ii].length; iii++) {
                        
                        
                    
                        total1+=this.items[index].top[ii].price
                
                    // }
                }
            
          
            return total1
            }

        },
    taxP(){
           return this.sumPrice*0.1
        },
        
         


     sumPrice(){
            let total=0;
            for(let i=0;i<this.items.length; i++){
                total+=this.items[i].price
                for (let ii = 0; ii < this.items[i].top.length; ii++) {
                    
                    
                total+=this.items[i].top[ii].price
                

                }
            }
            return total

        },
  },
 methods:{ 
     deleteItem(index){
         this.items.splice(index,1)
     },
    
	orderDone(){
        this.$router.push('/Orderfinish')},
	
	checkFrom(event){
		var attmark = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/); 
		var yuubin = new RegExp(/^\d{3}-\d{4}$/);
		var denwa = new RegExp(/^0\d{1,4}-\d{1,4}-\d{3,4}$/);

		// var dt = new Date();
		// var hours = dt.getHours();
		// var time = this.humans[0].orderTime - hours
		
		
	
      //入力フォームのバリデーション
      if (this.humans[0].name == "") {
		this.Validation.userResult="名前を入力してください"

	}else if(this.humans[0].email == ""){
	this.Validation.userResult="アドレスを入力してください"

	}else if(!attmark.test(this.humans[0].email)){
       this.Validation.userResult="メールアドレスの形式が不正です"
		
	}else if(this.humans[0].addNumber == ""){
	this.Validation.userResult="郵便番号を入力してください"

	}else if(!yuubin.test(this.humans[0].addNumber)){
       this.Validation.userResult="郵便番号はXXX-XXXXの形式で入力してください"

	}else if(this.humans[0].address == ""){
	this.Validation.userResult="住所を入力してください"

	}else if(this.humans[0].tel == ""){
	this.Validation.userResult="電話番号を入力してください"

	}else if(!denwa.test(this.humans[0].tel)){
       this.Validation.userResult="電話番号はXXXX-XXXX-XXXXの形式で入力してください"

	}else if(this.humans[0].orderDate == ""){
	this.Validation.userResult="配送日を入力してください"

	}else if(this.humans[0].orderTime == ""){
	this.Validation.userResult="配送時間を入力してください"

	// }else if(time  <= 3 ){
	// this.Validation.userResult="今から3時間後の日時をご入力ください"

    } else{
       this.$router.push('/Orderfinish')
       
        // orderDone()
        //  //ここはページ移動処理
       event.preventDefault() 
	}

	
	},
      
    
		
     kakunin(){
        
		// console.log(this.getPizzas)
		// console.log(this.getToppings)
		// console.log(this.getCartItems)
		// console.log(this.getSelectItem[0])
		
		
		
	},

	
}

}

</script>