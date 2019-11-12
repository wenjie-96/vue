<template>
  <div class="person">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color:#303133;font-size:16px">个人中心</span>
        <el-divider></el-divider>

        <span>管理员ID：{{accountInfo.id}}</span>
        <el-divider></el-divider>
        <span>账号：{{accountInfo.account}}</span>
        <el-divider></el-divider>
        <span>用户组：{{accountInfo.userGroup}}</span>
        <el-divider></el-divider>
        <span>创建时间：{{accountInfo.ctime|fliterTime}}</span>
        <el-divider></el-divider>
        <span>管理员头像：</span>

        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/account/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="accountInfo.imgUrl" :src="serveApi+accountInfo.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>


        <el-divider></el-divider>
        <el-button class="avatarImg" size="small" type="primary" @click="editAvatar">修改头像</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getPersonInfo,editImg } from "../api/account";
import moment from "moment"
export default {
  data() {
    return {
        serveApi:"http://127.0.0.1:5000/upload/account/",
       accountInfo:{
           id:"",ctime:"",account:"",userGroup:"",imgUrl:""
       }
    };
  },
  methods: {
    handleAvatarSuccess(res) {
        let{code,imgUrl}=res
        if(code===0){

            this.accountInfo.imgUrl=imgUrl
        }
        
    },

    beforeAvatarUpload(file) {
         const isJPG = file.type === 'image/jpeg';
         const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!(isJPG||isPNG)) {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG||isPNG) && isLt2M;
    },

    async getinfo() {
     let{accountInfo}= await getPersonInfo();
     this.accountInfo=accountInfo
     
    },
    async editAvatar(){
      let{code} = await editImg({imgUrl:this.accountInfo.imgUrl})

      if(code===0){
          //组件通信
          this.$bus.$emit("updateAvatar")
      }
    }
  },
  created() {
    this.getinfo();
    
  },
  filters:{
      fliterTime(time){
          return moment(time).format("YYYY/MM/DD hh:mm:ss")
      }
  }
};
</script>

<style lang="less" scoped>
.person {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-left: 80px;
  }
  span {
    color: #606266;
    font-size: 14px;
  }

  .avatarImg{
    margin-left: 126px;
  }
}
</style>