<template>
	<el-form :model="shopForm" :rules="shopRules" ref="shopForm" label-width="90px" label-position="right">
		<el-form-item label="门店名称" prop="restname">
			<el-input v-model="shopForm.restname" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="手机号" prop="mobile">
			<el-input v-model="shopForm.mobile" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="电话" prop="telephone">
			<el-input v-model="shopForm.telephone" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="地址" prop="address">
			<el-input v-model="shopForm.address" placeholder=""></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" :loading="sending" @click="onSubmit">提 交</el-button>
			<el-button @click="onCancel">取 消</el-button>
		</el-form-item>

	</el-form>
</template>

<script>
	import { RestApi } from '../api/index'

	export default {
		mounted() {
			this.restid = this.$route.params.id;
			if(this.restid) {
				RestApi.fetchByRestId({
					restid: this.$route.params.id
				}, (res) => {
					if(res.errnum == 10000) {
						this.shopForm = res.data
					}
					
				})
			}
			
		},
		data() {
			return {
				sending: false,
				shopForm: {
					restname: '',
					mobile:'',
					telephone:'',
					address: ''
				},
				shopRules: {
					restname: [
						{
							required: true,
							message: '请输入账号',
						}
					],
					mobile: [
						{
							required: true,
							message: '请输入手机号'
						},
						{  pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }

					],
					telephone: [
						{
							required: true,
							message: '请输入电话号码',
						}
					],
					address: [
						{
							required: true,
							message: '请输入地址',
						}
					],
				},
				
			}
	  
		},
		computed: {
			userid() {
				return this.$store.getters.userid;
			}
		},
		methods: {
			onSubmit() {
				this.$refs.shopForm.validate((valid) => {
					if (valid) {
						this.sending = true;
						let params = {
							userid: this.userid,
							restname: this.shopForm.restname,
							mobile: this.shopForm.mobile,
							telephone: this.shopForm.telephone,
							address: this.shopForm.address
						}
						if(this.restid) {
							params.restid = this.restid;
							RestApi.updateRest(params, (res) => {
								this.sending = false;
								this.$store.dispatch('fetchRestList')
								this.$router.push('/view/main/shopmanage')
								
							})
						} else {
							RestApi.addRest(params, (res) => {
								this.sending = false;
								this.$store.dispatch('fetchRestList')
								this.$router.push('/view/main/shopmanage')
								
							})
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			onCancel() {
				this.$router.go(-1)
			}
		}
	}
</script>