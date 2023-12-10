<template>
	<div id="app">
		<HelloWorld title="Hello" message="This is Vue3 sample project!!"></HelloWorld>
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"

export default {
	name: "App",
	components: {
		HelloWorld
	}
}
</script>
