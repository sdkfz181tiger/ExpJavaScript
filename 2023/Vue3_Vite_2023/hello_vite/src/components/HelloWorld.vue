<template>
	<div class="alert alert-info">
		<h2>{{ title }}</h2>
		<p>{{ message }}</p>
		<hr>
		<div>
			<input class="form-control" type="text" v-model="input">
			<button class="btn btn-primary mt-2" v-on:click="doAction">Click</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "HelloWorld",
	props: {
		title: String,
		message: String
	},
	data() {
		return {
			message: "お名前は?",
			input: "ななし"
		}
	},
	methods:{
		doAction(){
			this.message = "こんにちは、" + this.input + "さん!!"
		}
	}
}
</script>
