<template>
	<img alt="Vue logo" src="./assets/logo.png"/>
	<HelloWorld msg="Hello Counter"/>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import CmpCounter from "./components/CmpCounter.vue";

export default {
	name: "App",
	components: {
		HelloWorld,
		CmpCounter
	}
}
</script>
