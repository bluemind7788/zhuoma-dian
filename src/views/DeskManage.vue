<template>
	<div class="desk-manage">
		<div class="add-desk">
			<el-button type="primary" @click="dialogFormVisible = true">新增桌位</el-button>
		</div>
		<div class="add-desk-dialog">
			<el-dialog title="新增桌位" v-model="dialogFormVisible" size="tiny">
				<el-form :model="addDeskForm">
					<el-form-item label="新增个数" label-width="70">
						<el-input v-model="addDeskForm.num"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="onAddFormOk">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="desks-show">
			<desk v-for="desk in deskList" :restid="selectedRestId" :desk="desk"></desk>
		</div>
	</div>
</template>

<script>
	import { DeskApi } from '../api/index'
	import Desk from '../components/deskmanage/desk.vue'

	export default {
		components: {
			Desk
		},
		created() {

		},
		data() {
			return {
				dialogFormVisible: false,
				addDeskForm: {
					num: 0
				},
				qrcode: ''
			}
		},
		watch: {
			
		},
		computed: {
			selectedRestId() {
				return this.$store.getters.selectedRestId;
			},
			deskList() {
				return this.$store.getters.selRestDesks;
			},
		},
		filters: {
			genDeskUrl(value) {
				return 'http://www.zhuoma.tech:8080/view/menu/' + Number(this.selectedRestId).toString(36) + '/' + Number(value).toString(36)
			}
		},
		mounted() {

			// let data = this.$refs.firstQrcode.qrious.toDataURL()
			// this.$refs.firstCodeDown.setAttribute("href", data);
			// this.$refs.firstCodeDown.setAttribute("download", "YourFileName.png");
		},
		methods: {
			onAddNewDesk() {

			},
			onAddFormOk() {
				if(this.addDeskForm.num > 0) {
					DeskApi.addDesks({
						restid: this.selectedRestId,
						num: this.addDeskForm.num
					}, (res) => {
						console.log(res)
						this.dialogFormVisible = false
					})
				}


			}
		}
	}
</script>

<style lang="stylus">
	.rest-select
		display inline-block
	.desks-show
		margin-top 20px


					
</style>
