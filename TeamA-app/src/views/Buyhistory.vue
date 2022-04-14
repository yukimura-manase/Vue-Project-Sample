<template>
    <div id="list">

        <h1>注文確認画面</h1>
        
        <div class="container">	
        
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
						</tr>

                        
						<tr v-for="(item,i) in getCartItems.CartItem.cartItemList" :key="item.pizzaid + 'A' + i">
							<td> 
                                {{getPizzasById(item.pizzaid).name}}
                                <img class="pizzaimage" :src="require('../assets/img/img_pizza/' + getPizzasById(item.pizzaid).image)" >							
							</td>
							<td>
								{{item.price.substr(-1)}}サイズ、
                                {{getPizzasById(item.pizzaid)[item.price]}}円、
								{{item.number}}枚
							</td>
							<td>
								<ul>
                                    <li v-for="(tid,i) in item.toppingid" :key="tid + i">
										{{getToppingsById(tid).name}}{{getToppingsById(tid)[item.price]}}円
									</li>
								</ul>
							</td>
							<td>
								<div class="text-center">
                                    {{ topPrice(i)}}円
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
					<span id="total-price">消費税：{{taxP}}円</span><br>
					<span id="total-price">ご注文金額合計（税込）：{{taxP+sumPrice}}円</span>
				</div>
			</div>
		</div>

		
	</div>
	<!-- end container -->

    <div>
			<div class="row">
				<div
					class="table-responsive col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
					<h3 class="text-center">お届け先情報</h3>
					<table class="table table-striped item-list-table">
						<tbody>
							<tr>
								<td>
									<div class="text-center">
										お名前
									</div>
								</td>
								<td>
									<input type="text" v-model="humans.name">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center" >
										メールアドレス
									</div>
								</td>
								<td>
									<input type="text" v-model="humans.email">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										郵便番号
									</div>
								</td>
								<td>
									<input type="text" v-model="humans.addNumber">&nbsp;&nbsp;<button>住所検索</button>
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										住所
									</div>
								</td>
								<td>
									<input type="text" v-model="humans.address">
								</td>
							</tr>
							<tr>
								<td>
									<div class="text-center">
										電話番号
									</div>
								</td>
								<td>
									<input type="text" v-model="humans.tel">
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
											<div class="col-sm-5">
												<input type="date" name="name" id="name"
													class="form-control input-sm" v-model="humans.orderDate"/>
											</div>
										</div>										
										<div class="row">
											<div class="col-sm-12" >
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" checked="checked" value="10" v-model="humans.orderTime">
													10時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="11" v-model="humans.orderTime">
													11時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="12" v-model="humans.orderTime">
													12時
												</label><br>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="13" v-model="humans.orderTime">
													13時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="14" v-model="humans.orderTime">
													14時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="15" v-model="humans.orderTime">
													15時
												</label><br>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="16" v-model="humans.orderTime">
													16時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="17" v-model="humans.orderTime">
													17時
												</label>
												<label class="radio-inline">
													<input type="radio"
														name="responsibleCompany" value="18" v-model="humans.orderTime">
													18時
												</label><br>
											</div>
										</div>
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
			<div class="row">
				<div
					class="table-responsive col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
					<h3 class="text-center">お支払い方法</h3>
					<table class="table table-striped item-list-table" >
						<tbody>
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
													name="kessai" checked value="1">
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
								<td>
									<div class="row">
										<div class="col-sm-12">
											<label class="radio-inline">
												<input type="radio"
													name="kessai" value="2">
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
					
		<div class="row justify-content-center">																		
			<input type="button" class="btn btn-warning col-10" v-on:click="checkFrom" value="注文(確定)">
		</div>
		<div class="row justify-content-center">	
			<ul>
				<li v-for="text in Validation" :key="text">{{text}}</li>
			</ul>		
		</div>			
	</div>
</div>
            
</template>

<style src="../../public/css/bootstrap.css"></style>
 <style src="../../public/css/piza.css"></style>

<script>

 import { mapActions, mapGetters } from "vuex"

export default {
 data () {
   return {
     items: [      
     ],
     humans:
        {
			orderDate:"",
            orderTime:0,
            name:'大谷',
            email:'ootani@gmail.com',
            addNumber:'342-4422',
            address:'アメリカ合衆国ロサンゼルス州',
            tel:'080-2372-2322',
			status:0,
			
			}	,
	Validation:[]
   }
 },
  computed:{

	...mapGetters(['getPizzas','getToppings','getCartItems','getPizzasById','getToppingsById','getSelectItem']),	
	
    topPrice(){
			return index => {
				let cil = this.getCartItems.CartItem.cartItemList[index]									
				let total = this.getPizzasById(cil.pizzaid)[cil.price] * 1;				
				for (let i = 0; i < cil.toppingid.length; i++) {                 
					total += this.getToppingsById(cil.toppingid[i])[cil.price] * 1;     					      
				}				
				
				return total * cil.number
			}
		},
		taxP(){
			return this.sumPrice * 0.1
		},
		sumPrice(){
			let cils = this.getCartItems.CartItem.cartItemList.concat()
			let total = 0			

			for (let i = 0; i < cils.length; i++) {
				total += this.getPizzasById(cils[i].pizzaid)[cils[i].price] * cils[i].number;

				for (let j = 0; j < cils[i].toppingid.length; j++) {
					total += this.getToppingsById(cils[i].toppingid[j])[cils[i].price] * cils[i].number;
				}											
			}
			return total
		},
  },
 methods:{     
	...mapActions(['addCarts']),     	
	checkFrom(){
		var attmark = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/); 
		var yuubin = new RegExp(/^\d{3}-\d{4}$/);
		var denwa = new RegExp(/^0\d{1,4}-\d{1,4}-\d{3,4}$/);

		var dt = new Date();
		var hours = dt.getHours();		
		
		var dateDiff = new Date(this.humans.orderDate).getDate() - dt.getDate();				
		var time = this.humans.orderTime - hours						
		let radios = document.getElementsByName("kessai");		
		for(var i=0; i<radios.length; i++){
			if (radios[i].checked) {
				this.humans.status =  radios[i].value;										
			}
		}

      //入力フォームのバリデーション
		this.Validation = []	  
		if (this.humans.name == "") { this.Validation.push("名前を入力してください") }
		if(this.humans.email == ""){ this.Validation.push("アドレスを入力してください") }
		else if(!attmark.test(this.humans.email)){ this.Validation.push("メールアドレスの形式が不正です") }
		if(this.humans.addNumber == ""){ this.Validation.push("郵便番号を入力してください") }
		else if(!yuubin.test(this.humans.addNumber)){ this.Validation.push("郵便番号はXXX-XXXXの形式で入力してください") }
		if(this.humans.address == ""){ this.Validation.push("住所を入力してください") }
		if(this.humans.tel == ""){ this.Validation.push("電話番号を入力してください") }
		else if(!denwa.test(this.humans.tel)){ this.Validation.push("電話番号はXXXX-XXXX-XXXXの形式で入力してください") }
		if(this.humans.orderDate == ""){ this.Validation.push("配送日を入力してください") }
		if(this.humans.orderTime == 0){ this.Validation.push("配送時間を入力してください") }
		if(time  <= 3 && dateDiff < 1 ){ this.Validation.push("今から3時間後の日時をご入力ください") }
		if(this.humans.status == 0){ this.Validation.push("支払い方法を選択してください") }		
				
		if(this.Validation.length == 0){			
			this.addCarts(this.humans)
			this.$router.push('/Orderfinish')							
		}		
	
	},	
}

}

</script>

<style scoped>
.pizzaimage{
	width: 10vw
}
</style>