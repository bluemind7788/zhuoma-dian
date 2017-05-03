<template>
	<div class="desk-manage">
		<!-- <div class="rest-select">
			<el-select v-model="restValue" placeholder="请选择">
				<el-option
					v-for="item in restOptions"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</div> -->
		
		<div class="tag-area">
			<div class="tag-actions" :class="{ editing : tagEditing }">
				<div class="button-action"><el-button size="small" @click="showInput">新增分类</el-button></div>
				<div class="button-action"><el-button size="small" @click="tagEditing = !tagEditing">{{ tagEditing ? '返 回' : '编辑分类'}}</el-button></div>
			</div>
			<div class="food-tags" :class="{ editing : tagEditing }">
				<div class="food-tag" v-for="(tag, index) in tags">
					<el-tag
						:closable="tagEditing"
						:type="tag.type"
						@close="onTagRemove(tag)"
						@click.native="onTagClick(tag)"
						:class="{selected: tag.tagid == selectedTagId}"
						>
						{{tag.tagname}}
					</el-tag>
					<div class="tag-switcher" v-show="tagEditing">
						<i class="el-icon el-icon-caret-left" v-if="index > 0" @click="onTagUpgrade(tag)"></i>
						<i class="el-icon el-icon-caret-right" v-if="index < tags.length-1" @click="onTagUpgrade(tags[index+1])"></i>
					</div>
				</div>
			
			
				<div class="input-new-tag" v-if="inputVisible">
					<el-input
						v-model="inputValue"
						ref="saveTagInput"
						size="mini"
						@keyup.enter.native="handleInputConfirm"
						@blur="handleInputConfirm"
						>
					</el-input>
				</div>
			</div>

		</div>
		<div class="add-food">
			<router-link to="/view/main/menuadd"><el-button type="primary" @click="dialogFormVisible = true">新增菜品</el-button></router-link>
		</div>
		<el-table
		:data="selectedMenu"
		style="width: 100%" class="el-table">
			<el-table-column
				prop="foodname"
				label="菜名"
				>
			</el-table-column>
			<el-table-column
				prop="image"
				label="图片"
				width="130">
				<template scope="scope">
					<img class="food-image" :src="scope.row.image | addImagePre" />
				</template>
			</el-table-column>
			<el-table-column
				prop="price"
				label="价格"
				width="130">
			</el-table-column>
			<el-table-column
				prop="des"
				label="描述"
				width="100">
			</el-table-column>
			<el-table-column
				prop="tags"
				label="分类"
				width="130">
				<template scope="scope">
			        <el-tag	class="menu-tag" :type="'primary'" v-for="tag in scope.row.tags" close-transition>{{ tag.tagname }}</el-tag>
		        </template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="100">
				<template scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
	</div>
</template>

<script>
import { TagApi, MenuApi } from '../api/index'

	export default {
		created() {
			// if(this.restOptions.length > 0) {
			// 	this.restValue = this.restOptions[0].value
			// } else {
			// 	this.restValue = ''
			// }
		},
		data() {
			return {
				// restValue: '',
				tableData: [{
					foodid: 1,
					foodname: '秘制鸡翅',
					image: '94cdec769272d1ec7cf',
					price: 8.0,
					des: '',
				}],
				tagEditing: false,
				inputVisible: false,
				inputValue: '',
				selectedTagId: ''
			}
		},
		filters: {
			addImagePre(value) {
				return 'http://www.zhuoma.tech/public/imgs/' + value + '.jpg'
			},

		},
		computed: {
			// restOptions() {
			// 	let result = []
			// 	this.$store.getters.restList.forEach((rest) => {
			// 		result.push({
			// 			value: rest.restid,
			// 			label: rest.restname
			// 		})
			// 	})
			// 	return result;
			// },
			selectedRestId() {
				return this.$store.getters.selectedRestId;
			},
			tags() {
				let tags = []
				this.$store.getters.selRestTags.forEach((tag) => {
					tags.push({
						tagname: tag.tagname,
						tagid: tag.tagid,
						tagord: tag.tagord,
						type: 'primary'
					});
				});
				return tags;
			},
			menu() {
				let menu = []
				this.$store.getters.selRestMenu.forEach((item) => {
					item.tags = [];
					item.tag1 && item.tags.push(this.tagObj[item.tag1])
					item.tag2&& item.tags.push(this.tagObj[item.tag2])
					item.tag3 && item.tags.push(this.tagObj[item.tag3])

					menu.push(item)
				})
				return menu
			},
			tagObj() {
				let tagObj = {}
				this.tags.forEach((tag) => {
					tagObj[tag.tagid] = tag
				})
				return tagObj;
			},
			selectedMenu() {
				if(!this.selectedTagId) return this.menu;
				let selMenu = []
				this.menu.forEach((item) => {
					if(this.selectedTagId === item.tag1 || this.selectedTagId === item.tag2 || this.selectedTagId === item.tag3 ) {
						selMenu.push(item)
					}
				})
				return selMenu;
			},

		},
		watch: {
			// restOptions() {
			// 	if(this.restOptions.length > 0) {
			// 		this.restValue = this.restOptions[0].value
			// 	} else {
			// 		this.restValue = ''
			// 	}
			// },

			
		},
		mounted() {
		
		},
		methods: {
			onAddNewDesk() {

			},
			fetchMenu() {
				this.$store.dispatch('fetchMenu')
			},
			handleEdit(row) {
				this.$router.push('/view/main/menuadd/' + row.foodid)
			},
			handleDelete(row) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					MenuApi.deleteFood({
						foodid: row.foodid
					}, (res) => {
						this.$store.dispatch('fetchMenu');
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			onTagClick(tag) {
				this.selectedTagId = tag.tagid
			},
			onTagRemove(tag) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					TagApi.deleteTag({
						tagid: tag.tagid
					}, (res) => {
						this.tags.splice(this.tags.indexOf(tag), 1);
						this.fetchMenu();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
				
				
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					TagApi.addTag({
						restid: this.selectedRestId,
						tagname: inputValue
					}, (res) => {
						console.log(res)
						this.tags.push({tagname: this.inputValue, tagid: res.data.tagid, tagord: res.data.tagord, type: 'primary'});
						this.$nextTick(() => {
							this.inputValue = '';
							this.inputVisible = false;
						})
						
					})
					
				}
				
				
			},
			onTagUpgrade(tag) {
				TagApi.upgradeTag({
					tagid: tag.tagid,
					tagord: tag.tagord,
					restid: this.selectedRestId,
				}, (res) => {
					this.$store.commit('setSelTags', res.data)
					// this.tags.splice(0, this.tags.length)
					// res.data.forEach((tag) => {
					// 	this.tags.push({
					// 		tagname: tag.tagname,
					// 		tagid: tag.tagid,
					// 		tagord: tag.tagord,
					// 		type: 'primary'
					// 	});
					// });
				});
			},
		}
	}
</script>

<style lang="stylus">
	.rest-select
		display inline-block
	.add-food
		display inline-block
		margin 10px 0
		float right
	.food-image
		width 50px
		height 50px
		margin-top 10px
	.tag-area
		margin-top 10px
		padding 10px 10px
		border solid 1px #dfe6ec
		min-height 88px
		.food-tags
			margin-right 50px
			.food-tag, .input-new-tag
				display inline-block
				margin-right 10px
				margin-bottom 10px
				vertical-align middle
			.food-tag
				position relative
				.el-tag.selected
					border-color #20a0ff
			&.editing
				.food-tag, .input-new-tag
					margin-top 20px

		.el-tag
			&:hover
				border-color #20a0ff
				cursor pointer
		.el-icon
			position absolute
			top -20px
			color rgba(32,160,255,.1)
			&:hover
				color #20a0ff
				cursor pointer
		.el-icon-caret-left
			left 0
		.el-icon-caret-right
			right 0
		.tag-actions
			float right
			&.editing
				margin-top 20px
			.button-action
				margin-bottom 10px
				
	.menu-tag
		margin-top 5px
		margin-right 10px			

					
</style>
