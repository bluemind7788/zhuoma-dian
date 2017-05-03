<template>
	<div>
		<top-header></top-header>
		<section class="main-section clearfix">
			<div class="left-nav">
				<left-nav></left-nav>
			</div>
			<div class="main-content">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		
		</section>
		
		
	</div>
</template>

<script>
	import TopHeader from '../components/common/TopHeader.vue'
	import LeftNav from '../components/common/LeftNav.vue'
	export default {
		components: {
			TopHeader,
			LeftNav
		},
		mounted() {
			if(!localStorage.getItem('userid')) {
				this.$router.push('/view/login')
			}
		}
	}
</script>

<style lang="stylus">
.main-section
	margin 0 auto
	padding-top 20px
	width 1000px
	.left-nav
		float left
		width 200px
	.main-content
		float left
		margin-left 20px
		width 780px




</style>