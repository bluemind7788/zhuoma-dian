<template>
	<el-form class="food-form" :model="foodForm" :rules="foodRules" ref="foodForm" label-width="90px" label-position="right">
		<el-form-item label="菜名" prop="foodname">
			<el-input v-model="foodForm.foodname" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="图片" prop="image">
			<el-upload
				class="avatar-uploader"
				action="http://www.zhuoma.tech/image/uploading"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-show="foodForm.image" :src="foodForm.image | addImagePre" class="avatar">
				<i v-show="!foodForm.image" class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>

		</el-form-item>
		<el-form-item label="价格" prop="price">
			<!-- <el-input v-model="foodForm.price" placeholder=""></el-input> -->
			<el-input-number v-model="foodForm.price" :min="0"></el-input-number>
		</el-form-item>
		<el-form-item label="描述" prop="des">
			<el-input v-model="foodForm.des" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="分类" prop="tags">
			<el-select
				v-model="foodForm.tags"
				multiple
				filterable
				allow-create
				>
				<el-option
				v-for="item in foodTags"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>

		</el-form-item>
		<el-form-item>
			<el-button type="primary" :loading="sending" @click="onSubmit">提 交</el-button>
			<el-button @click="onCancel">取 消</el-button>
		</el-form-item>

	</el-form>
</template>

<script>
import { MenuApi } from '../api/index'

	export default {
		create() {
			
		},
		mounted() {
			
			this.foodid = this.$route.params.id;
			
			
		},
		data() {
			return {
				foodid: '',
				foodForm: {
					foodname: '',
					image: '',
					price: null,
					des: '',
					tags: []
				},
				foodRules: {
					foodname: [
						{
							required: true,
							message: '请输入菜名',
						}
					],
					image: [
						{
							required: true,
							message: '请上传图片',
						}
					],
					price: [
						{
							required: true,
							message: '请输入价格',
						}
					],
					tags: [
						{
							required: true,
							message: '请选择分类',
						}
					],
				},
				sending: false
			}
		},
		computed: {
			selectedRestId() {
				return this.$store.getters.selectedRestId;
			},
			foodTags() {
				let tags = []
				this.$store.getters.selRestTags.forEach((tag) => {
					tags.push({
						value: tag.tagid,
						label: tag.tagname
					});
				});
				return tags;
			},
			menu() {
				return this.$store.getters.selRestMenu;
			},

		},
		watch: {
			menu(newMenu) {
				if(!this.foodid) return;
				for(let i =0;i < newMenu.length;i++) {
					let item = newMenu[i];
					if(item.foodid == this.foodid) {
						
						this.foodForm.foodname = item.foodname;
						this.foodForm.image = item.image;
						this.foodForm.price = item.price;
						this.foodForm.des = item.des;
						this.foodForm.tags = [];
						item.tag1 && this.foodForm.tags.push(item.tag1);
						item.tag2 && this.foodForm.tags.push(item.tag2);
						item.tag3 && this.foodForm.tags.push(item.tag3);
						break;
					}
				}
			},
			foodid(val) {
				if(!val) return;
				for(let i =0;i < this.menu.length;i++) {
					let item = this.menu[i];
					if(item.foodid == val) {
						this.foodForm.foodname = item.foodname;
						this.foodForm.image = item.image;
						this.foodForm.price = item.price;
						this.foodForm.des = item.des;
						this.foodForm.tags = [];
						item.tag1 && this.foodForm.tags.push(item.tag1);
						item.tag2 && this.foodForm.tags.push(item.tag2);
						item.tag3 && this.foodForm.tags.push(item.tag3);
						break;
					}
				}
			}
		},
		filters: {
			addImagePre(value) {
				return 'http://www.zhuoma.tech/public/imgs/' + value + '.jpg'
			},

		},
		methods: {
			onSubmit() {
				this.$refs.foodForm.validate((valid) => {
					if (valid) {
						this.sending = true;
						MenuApi.addOrUpdateFood({
							foodid: this.foodid,
							restid: this.selectedRestId,
							foodname: this.foodForm.foodname,
							image: this.foodForm.image,
							price: this.foodForm.price,
							des: this.foodForm.des,
							tag1: this.foodForm.tags[0],
							tag2: this.foodForm.tags.length > 1 ? this.foodForm.tags[1] : '',
							tag3: this.foodForm.tags.length > 2 ? this.foodForm.tags[2] : ''
						}, (res) => {
							this.sending = false;
							this.$store.dispatch('fetchMenu')
							this.$router.push('/view/main/menumanage')
						});
						
					}
				});
				
			},
			onCancel() {
				this.$router.go(-1)
			},
			handleAvatarSuccess(res, file) {
				this.$set(this.foodForm, 'image', res.imgname)
				// this.foodForm.image = res.imgname;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				  this.$message.error('上传头像图片只能是JPG格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #20a0ff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px !important;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.food-form .el-select {
	display: block;
}
</style>