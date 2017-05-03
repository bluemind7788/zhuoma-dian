<template>
	<div class="top-header">
		<div class="top-header-wrap">
			<div class="logout" v-show="username">
				<div class="rest-select">
					<el-select v-model="selectedRestId" placeholder="请选择门店">
						<el-option
							v-for="item in restOptions"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<span class="username">{{ username }}</span>
				<el-button type="text" @click="clearUser" >退出</el-button>
			</div>
			<div class="logp-title" >桌码商户后台管理系统</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.$store.dispatch('userInit')
			this.$store.dispatch('fetchRestList')
		},
		data() {
			return {
			}
		},
		computed: {
			username() {
				return this.$store.getters.username
			},
			selectedRestId: {
				get () {
					return this.$store.getters.selectedRestId
				},
				set (value) {
					this.$store.dispatch('updateSelectedRestId', value)
				},
			},
			restOptions() {
				let result = []
				this.$store.getters.restList.forEach((rest) => {
					result.push({
						value: rest.restid,
						label: rest.restname
					})
				})
				return result;
			},
		},
		methods: {
			clearUser() {
				this.$store.dispatch('clearUser')
				this.$router.push('/view/login')
			}
		}
	}
</script>



<style lang="stylus">
.top-header
	width 100%
	height 62px
	border-bottom solid 2px #20a0ff
	.top-header-wrap
		margin 0 auto
		width 1000px
		.logp-title
			line-height 60px
			font-size 18px
			font-weight bold
		.logout
			float right
			position relative
			top 14px
			.rest-select
				margin-right 20px
			.username
				margin-right 10px

</style>