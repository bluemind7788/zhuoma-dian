<template>
	<el-form :model="regForm" :rules="regRules" ref="regForm" label-width="70px" label-position="right">
		<el-form-item label="用户名" prop="account">
			<el-input v-model="regForm.account" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input type="password" v-model="regForm.password" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="手机号" prop="mobile">
			<el-input v-model="regForm.mobile" placeholder=""></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" :loading="sending" @click="onReg">注 册</el-button>
			<el-button type="text" @click="onBackLogin">返回登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { AuthApi } from '../../api/index'
import md5 from '../../util/md5'

export default {
	data() {
		return {
			sending: false,
			regForm: {
				account: '',
				password: '',
				mobile: '',

			},
			regRules: {
				account: [
					{
						required: true,
						message: '请输入用户名'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码'
					}
				],
				mobile: [
					{
						required: true,
						message: '请输入手机号'
					},
					{  pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }

				],
			},
		}
  
	},
	methods: {
		onReg() {
			this.$refs.regForm.validate((valid) => {
				if (valid) {
					this.sending = true;
					let password = md5(this.regForm.password)
					AuthApi.register({
						username: this.regForm.account,
						userpassword: password,
						mobile: this.regForm.mobile
					}, (res) => {
						this.sending = false;
						typeof localStorage != 'undefined' && localStorage.setItem('username', this.regForm.account);
						this.$router.push('/view/main/')
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		onBackLogin() {
			this.$emit('backLogin')
		}
	}
};
</script>

<style lang="stylus">
	.el-form
		margin-top 20px
</style>