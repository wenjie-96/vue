<template>
  <div class="home">


<el-container>
  <!-- <el-aside width="200px">Aside</el-aside> -->
  <LeftNav></LeftNav>
    <RightContent></RightContent>
  <!-- <el-container> -->
    <!-- <el-header>Header</el-header>
    <el-main>Main</el-main> -->
  <!-- </el-container> -->
</el-container>
  </div>
</template>

<script>
import LeftNav from "../components/LeftNav.vue"
import RightContent from "../components/RightContent.vue"
  export default {
    components:{
      LeftNav,
      RightContent
    }
  }
</script>

<style lang="less">
.home{
  width: 100%;
  height: 100%;
  .el-container{
    width: 100%;
    height: 100%;
  //   .el-aside{
  //   background: #304156;
  // }
  // .el-header{
  //   background: #fff;
  // }
  // .el-main{
  //   background: #EEF3FA;
  // }
  }
  

}
</style>