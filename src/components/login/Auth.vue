<template>
	<div class="auth">
	<!-- 	<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="登录" name="first"></el-tab-pane>
				<el-tab-pane label="注册" name="second"></el-tab-pane>
			</el-tabs>
		</div> -->

		<el-form v-if="showLogin" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="70px" label-position="right">
			<el-form-item label="用户名" prop="account">
				<el-input v-model="loginForm.account" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="loginForm.password" placeholder=""></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
				<el-button type="text" @click="showLogin = false" class="reg-link">注册账号</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="sending" @click="onLogin">登 录</el-button>
			</el-form-item>

		</el-form>

		<register v-else @backLogin="showLogin = true"></register>

	</div>
</template>

<script>
import Register from './Register.vue'
import { AuthApi } from '../../api/index'
import md5 from '../../util/md5'

export default {
	components: {
		Register
	},
	data() {
		return {
			activeName: 'first',
			sending: false,
			showLogin: true,
			loginForm: {
				account: '',
				password: '',
				remember: true,

			},
			loginRules: {
				account: [
					{
						required: true,
						message: '请输入用户名',
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码'
					}
				],
			},

		}
  
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		onLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.sending = true;
					let password = md5(this.loginForm.password)
					AuthApi.login({
						username: this.loginForm.account,
						userpassword: password,
					}, (res) => {
						this.sending = false;
					
						localStorage.setItem('username', this.loginForm.account);
						localStorage.setItem('userid', res.data.userid);
						this.$router.push('/view/main/')
					}, () => {
						this.sending = false;
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		onReg() {

		},
	}
};
</script>

<style lang="stylus">
	.auth
		margin-top 80px
		padding 20px
		width 310px
		background #fff
		.reg-link
			float right
		.el-form
			margin-top 20px
</style>