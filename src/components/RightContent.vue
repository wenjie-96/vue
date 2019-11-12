<template>
  <div class="right-content">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :key="index" v-for="(item,index) in bread" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple rightbox">
              <!-- 下拉菜单 -->
              <el-dropdown  trigger="click"  @command="handleCommand">
                <span class="el-dropdown-link">
                  欢迎你，{{account}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    
                    <router-link to="/home/person" class="personal">个人中心</router-link>

                  </el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
   
                </el-dropdown-menu>
              </el-dropdown> 
              
              <div class="header-icon">
                <img v-if="imgUrl" :src="serveApi + imgUrl" alt="">
              </div>
              
            
            </div>
             
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import local from "../utils/local";
import {getPersonInfo} from "../api/account"
export default {
  data(){
    return{
      account:"",
      imgUrl:"",
      serveApi:"http://127.0.0.1:5000/upload/account/",
      bread:[]
    }
  },
  methods:{
    handleCommand(command){
      if(command==="logout"){
        //清除本地存储的token
        local.remove("token")

        //跳转到登录界面
        this.$router.push("/login")
        this.$message({
          type:"success",
          message:"退出登录成功"
        })

      }

    },

    //获取个人信息
   async getInfo(){
    let {accountInfo} = await getPersonInfo();

    let { account,imgUrl} =accountInfo;
    this.account=account
    this.imgUrl=imgUrl
    },
    breadArr(){
      this.bread=this.$route.meta.breadArr
      
    }
  },
  created(){
    this.$bus.$on("updateAvatar",()=>{
      this.getInfo()
    })
    this.getInfo()
    this.breadArr()
  },
  watch:{
    "$route.path"(){
      this.breadArr()
    }
  }
};
</script>

<style lang="less">
.right-content {
 
  width: 100%;
  height: 100%;
  .el-header {
    background: #fff;
    .el-breadcrumb {
      line-height: 60px;
    }
    .rightbox {
      line-height: 60px;
      height: 60px;
      display: flex;
      justify-content: flex-end;
      .header-icon{
        width: 50px;
        margin: 5px 20px;
        img{
          width: 100%;
          height: 100%;
        border-radius: 50%;
        }
      }

    }
  }
  .el-main {
    width: 100%;
    height: 100%;
    background: #eef3fa;
  }

}
</style>