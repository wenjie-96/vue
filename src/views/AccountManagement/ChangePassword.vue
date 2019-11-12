<template>
  <div class="change-password">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>

      <div class="content">
        <el-form
          :model="changePasswordForm"
          status-icon
          :rules="rules"
          ref="changePasswordForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="changePasswordForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="changePasswordForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="changePasswordForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('changePasswordForm')">提交</el-button>
            <el-button @click="resetForm('changePasswordForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { pwdReg } from "../../utils/reg";

// 引入接口请求方法
import { checkOldPwd,editPassword } from "../../api/account";

//引入本地存储
import local from "../../utils/local"
export default {
  data() {
    const validateOldPwd =async(rule,value,callback)=>{
      let { code, msg } = await checkOldPwd({ oldPwd: value });
     if(!value){
       callback(new Error("请输入原密码"))
     }else if(code==="11"){
       callback(new Error(msg))
     }else{
       callback()//成功
     }
    }

    const validateNewPwd =(rule,value,callback)=>{

        if(!value){
          callback(new console.error("请输入新密码"))
        }else if(!rule.patten.test(value)){
          callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"))

        }else if(value===this.changePasswordForm.oldPwd){
          callback(new Error("不能与旧密码相同"))
        }else{
          if(this.changePasswordForm.checkPass!==""){
            this.$refs.changePasswordForm.validateField("checkPass")
          }
          callback()
        }
    }

  const validateCheckPwd = (rule,value,callback)=>{
    if(!value){
      callback(new Error("请确认密码"))
    }else if(value!==this.changePasswordForm.newPassword){
      callback(new Error("两次密码不一致，请重新输入"))
    }else{
      callback()
    }
  }

    return {
      changePasswordForm: {
        oldPwd: "",
        newPassword: "",
        checkPass: ""
      },

      rules: {
        oldPwd: 
          {
            required: true,
            validator:validateOldPwd,
            trigger: "blur"
          },

        
        newPassword: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            validator: validateNewPwd,
            patten: pwdReg(),
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur"
          },
          {
            validator: validateCheckPwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //发送axios请求
        let {code} = await editPassword({
            newPwd:this.changePasswordForm.newPassword
          })

          if(code===0){
            
            local.remove("token")

          this.$router.push("/login");

          }else{
            return false
          }

        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.change-password {
  .box-card {
    width: 100%;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-form {
        width: 400px;
        margin-top: 50px;

        .el-cascader {
          width: 100%;
        }
      }
    }
  }
}
</style>