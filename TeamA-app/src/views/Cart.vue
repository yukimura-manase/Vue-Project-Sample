

<template>
    <div class="container">  

		<!-- table -->
		<div class="row">			
			<div class="table-responsive col-lg-10 col-md-10 col-sm-10 col-xs-12">
				<h3 class="text-center">ショッピングカート</h3>
				<div v-if="!(sumPrice === 0)">
					<table class="table table-striped item-list-table">
						<tbody>
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
								</th>
							</tr>
							<tr v-for="(item,i) in gP" :key="item.pizzaid + 'A' + i">
								<td> 
                                {{getPizzasById(item.pizzaid).name}}
                                <img class="pizzaimage" :src="require('../assets/img/img_pizza/' + getPizzasById(item.pizzaid).image)" >							
								</td>
								<td>
								{{item.price.substr(-1)}}サイズ、
                                {{getPizzasById(item.pizzaid)[item.price]}}円、
								{{item.number}}枚、
								</td>
								<td>
									<ul>
										<li v-for="(tid,i) in item.toppingid" :key="tid + i">
											{{getToppingsById(tid).name}}、	{{getToppingsById(tid)[item.price]}}円
										</li>
									</ul>
								</td>
								<td>
									<div class="text-center">
										{{ topPrice(i) }}円
									</div>
								</td>
								<td>
									<div class="text-center">
										<button type="submit" class="btn btn-primary" @click="deleteItem(i)">削除</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<h3 v-else class="noCart">
					<p>カートに商品はありません</p>
					<p class="kensaku"><a @click="$router.push({name:'Serch'})">商品検索はこちらをクリック</a></p>
					<p>本日のおすすめ</p>
					<p>{{osusume.name}}</p>
					<div><img class="pizzaImg" :src="require('../assets/img/img_pizza/' + osusume.image)"></div> 
					<p class="sizename">Mサイズ{{osusume.priceM}}円</p>
					<p class="sizename">Lサイズ{{osusume.priceL}}円</p>
					<p><a @click="submit(osusume.id)">詳細表示</a></p>
				</h3>								
			</div>
		</div>
		<div v-if="!(sumPrice === 0)">
			<div class="row">			
				<div class="form-group text-center col-md-offset-1">
					<span id="total-price">消費税：{{taxP}}円</span><br/>
					<span id="total-price">ご注文金額合計(税込)：{{`${taxP+sumPrice}`}}円</span>
				</div>
			</div>
		</div>
		<div v-if="!(sumPrice === 0)">
			<div class="row justify-content-center">																							
				<input class="btn btn-warning col-10 mt-5" type="button" value="注文に進む" @click="gotoLink">
			</div>
		</div>		
	</div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"

export default {   
	data () {
		return {
			pizzas: [],
		}
		
	},

	computed:{
		...mapGetters(['getPizzas','getToppings','getCartItems','getPizzasById','getToppingsById','getSelectItem','uid','midLogin']),

		topPrice(){			
			return index => {	
				let cil = {}
				if(this.getCartItems.CartItem && this.getPizzasById(1) ){
					cil = this.getCartItems.CartItem.cartItemList[index]
				}else{
					return 0
				}
												
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
			let cils = []				
			if(this.getCartItems.CartItem && this.getPizzasById(1) ){
				cils = this.getCartItems.CartItem.cartItemList.concat()
			}else{
				return 0
			}
			
			let total = 0			
			for (let i = 0; i < cils.length; i++) {							
				total += this.getPizzasById(cils[i].pizzaid)[cils[i].price] * cils[i].number;							
				for (let j = 0; j < cils[i].toppingid.length; j++) {					
					total += this.getToppingsById(cils[i].toppingid[j])[cils[i].price] * cils[i].number;
				}											
			}
			
			return total
		},
		gP(){								
			if(this.getCartItems.CartItem && this.getPizzasById(1) ){return this.getCartItems.CartItem.cartItemList.concat()}	
			else{return []}					
		},
		osusume(){
			let cil = Math.floor(Math.random() * this.getPizzas.length);
			return this.getPizzasById(cil);
		},

	},
	methods: {	
		...mapActions(['setCartItemList','login']),

		deleteItem(index){
			this.gP.splice(index,1)			
			this.setCartItemList(this.gP)
		},
		gotoLink(){			
			if(this.uid){
				this.$router.push({name:'Buyhistory'})
			}else{				
				alert('ログイン画面に移ります')
				this.login(true)
			}			
		},
		submit(id){
			this.$router.push({name:'ItemDetail', params:{ id }})
		}
    },
	created(){				
		if(this.midLogin){
			this.$router.push({name:'Buyhistory'})
		}
	},
    
}
</script>

<style scoped>
.pizzaimage{
	width: 10vw
}

.noCart{
	text-align: center;
}

.sizename{
	font-size: smaller;
}

.kensaku{
	font-size: medium;
}
.btnBlock{
	display: block;
}
</style>
