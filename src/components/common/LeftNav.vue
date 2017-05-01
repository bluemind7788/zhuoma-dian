<template>
	<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
		<router-link to="/view/main/shopmanage"><el-menu-item index="1"><i class="el-icon-menu"></i>门店管理</el-menu-item></router-link>
		<router-link to="/view/main/deskmanage"><el-menu-item index="2"><i class="el-icon-menu"></i>桌位管理</el-menu-item></router-link>
		<router-link to="/view/main/menumanage"><el-menu-item index="3"><i class="el-icon-menu"></i>菜单管理</el-menu-item></router-link>
		<router-link to="/view/main/ordermanage"><el-menu-item index="4"><i class="el-icon-menu"></i>订单管理</el-menu-item></router-link>
    </el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="stylus">
	.router-link-active
		.el-menu-item
			color #20a0ff
</style>
