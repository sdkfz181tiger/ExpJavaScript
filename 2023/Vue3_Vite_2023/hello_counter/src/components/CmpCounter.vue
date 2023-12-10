<template>
	<h1>{{ msg }}</h1>
	<button class="btn btn-primary" @click="count++">count is: {{ count }}</button>
	<p>Get ready!!</p>
</template>

<script>
export default {
	name: "CmpCounter",
	props: {
		msg: String
	},
	data() {
		return {
			count: 0
		}
	}
}
</script>
