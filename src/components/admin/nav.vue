<template>
  <div class="container">
    <el-menu default-active="2" class="el-menu-vertical-demo" style="height:100%;">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <router-link to="/article">
          <el-menu-item index="1-1">文章列表</el-menu-item>
        </router-link>
        <router-link to="/write">
          <el-menu-item index="1-2">发布文章</el-menu-item>
        </router-link>
        
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航二</span>
        </template>
        <router-link to="/article">
          <el-menu-item index="2-1">文章列表</el-menu-item>
        </router-link>
        <router-link to="/write">
          <el-menu-item index="2-2">发布文章</el-menu-item>
        </router-link>
        
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航三</span>
        </template>
        <router-link to="/article">
          <el-menu-item index="3-1">文章列表</el-menu-item>
        </router-link>
        <router-link to="/write">
          <el-menu-item index="3-2">发布文章</el-menu-item>
        </router-link>
        
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
</style>