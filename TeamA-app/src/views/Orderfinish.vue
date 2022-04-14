<template>
<div id="finish">
<div class="container">		

		<!-- table -->
		<div class="row">
			
			<div
				class="table-responsive col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
				<h1 class="text-center">ARIGATO!!</h1>
				<h3 class="text-center">決済が完了しました！</h3>
				<div class="text-center">
					<p>この度はご注文ありがとうございます。</p>
				</div>
			</div>
		</div>

		<br><br>
		<div class="row">
			<div class="col-xs-offset-5 col-xs-2">
				<div class="form-group">					
					<button class="btn btn-danger" @click="gotoLink">トップ画面を表示する</button>			
				</div>
			</div>
		</div>
	</div>

</div>

</template>

<script>
export default {
  name: 'Orderfinish',  //top画面に戻りたい
  methods:{
		gotoLink(){
			this.$router.push({ name:"Serch" })
		}
	}
}
</script>