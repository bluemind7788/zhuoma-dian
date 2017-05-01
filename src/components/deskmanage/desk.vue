<template>
	<div class="desk-item">
		<div>
			<qriously class="qrcode" :value="'http://www.zhuoma.tech:8080/view/menu/' + Number(restid).toString(36) + '/' + Number(desk.deskid).toString(36)" @valueChange="onQrcodeChange" :size="150" />
		</div>
		<div class="detail"><span>{{ desk.desknum }} 号桌</span><a class="down-qrcode" :href="qrcode" :download="desk.desknum+'.png'">下载</a></div>
	</div>
</template>

<script>
	export default {
		name: 'desk',
		props: {
			restid: {
	            type: Number,
	        },
	        desk: {
	        	type: Object
	        }
		},
		data() {
			return {
				qrcode: ''
			}
		},
		methods: {
			onQrcodeChange(code) {
				this.qrcode = code
			}
		}
	}
</script>

<style lang="stylus">
.desk-item
	display inline-block
	width 150px
	margin-right 10px
	margin-bottom 10px
	.detail
		position relative
		padding 0 10px
		font-size 14px
		.down-qrcode
			position absolute
			top 0px
			right 14px
			color #20a0ff
			cursor pointer
</style>