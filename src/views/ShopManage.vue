<template>
	<div>
		<div class="top-action">
			<router-link to="/view/main/shopadd"><el-button type="primary">新增门店</el-button></router-link>
		</div>
		<el-table
		:data="tableData"
		style="width: 100%" class="el-table">
			<el-table-column
				prop="restname"
				label="门店名称"
				>
			</el-table-column>
			<el-table-column
				prop="mobile"
				label="手机"
				width="130">
			</el-table-column>
			<el-table-column
				prop="telephone"
				label="电话"
				width="130">
			</el-table-column>
			<el-table-column
				prop="address"
				label="地址"
				width="230">
			</el-table-column>
			<el-table-column
				label="操作"
				width="100">
				<template scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>


	export default {
		mounted() {
			this.$store.dispatch('fetchRestList')
		},
		data() {
			return {
			}
		},
		computed: {
			tableData() {
				return this.$store.getters.restList;
			}
		},
		methods: {
			handleEdit(row) {
				this.$router.push('/view/main/shopadd/' + row.restid)
			}
		}
	}
</script>

<style lang="stylus">
	.el-table
		margin-top 20px
</style>