<template>
	<div>
		<top-header></top-header>
		<section class="login-section">
			<div class="login-section-wrap">
				<auth></auth>
			</div>
		</section>
		<footer class="footer">
			<ul class="help">
				<li class="help-item"><p>常见问题客服QQ</p><p class="contact">669380499</p></li>
				<li class="help-item"><p>代理商咨询</p><p class="contact">669380499</p></li>
				<li class="help-item"><p>技术支持咨询</p><p class="contact">669380499</p></li>
				<li class="help-item"><p>合作邮箱</p><p class="contact">669380499@qq.com</p></li>
			</ul>
		</footer>
	</div>
</template>

<script>
	import TopHeader from '../components/common/TopHeader.vue'
	import Auth from '../components/login/Auth.vue'

	export default {
		components: {
			TopHeader,
			Auth
		},
		mounted() {
			if(localStorage.getItem('userid')) {
				this.$router.push('/view/main')
			}
		}
	}
</script>

<style lang="stylus">
	.login-section
		width 100%
		height 460px
		background url(../assets/images/bg_login.jpg)
		.login-section-wrap
			margin 0 auto
			width 1000px
			.auth
				float: right
	.footer
		margin 0 auto
		width 1000px
		.help
			margin-top 20px
			.help-item
				float left
				width 25%
				line-height 30px
				.contact
					color #999
</style>

