<template>
	<div></div>
</template>

<script>
	export default {
		mounted() {
			let uid = localStorage.getItem('userid');
			if(uid) {
				this.$router.push('/view/main/shopmanage')
			} else {
				this.$router.push('/view/login')
			}
		}
	}
</script>