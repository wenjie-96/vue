<template>
  <div class="login">
    <el-form
      status-icon
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="demo-ruleForm"
    >
      <h1 class="title">系统登录</h1>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginForm.account"
          prefix-icon="iconfont icon-zhanghao"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="isopen?'text':'password'"
          prefix-icon="iconfont icon-mima"
          :suffix-icon="isopen?'iconfont icon-xianshikejian':'iconfont icon-bukejian-'"
          autocomplete="off"
          @click.native="changeType"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"    @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pwdReg } from "../utils/reg";

import { checklogin } from "../api/account";

import local from "../utils/local";
export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      if (!rule.patten.test(value)) {
        callback(new Error("密码必须包含数字和英文，长度为3-12位"));
      } else {
        callback();
      }
    };

    return {
      //登录表单
      loginForm: {
        account: "",
        password: ""
      },
      isopen: false, //眼睛状态
      rules: {
        account: [
          {
            required: true,
            message: "账户不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 6,
            message: "账号长度为3-6位",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            validator: validatePwd,
            patten: pwdReg(),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    changeType(e) {
      if (e.target.className.includes("kejian")) {
        this.isopen = !this.isopen;
      }
    },
    submitForm(){
      this.$refs.loginForm.validate(async vali=>{
        if(vali){

        let {code,token,role} = await checklogin(this.loginForm)

        if(code===0){
          local.set("token",token)
          local.set("role",role)

          this.$router.push("/home")

        }

          //跳转
        }else{
          return false
        }
      });
    },

  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.submitForm();// 登录方法名
         return false;
      }
    };
  }
};








</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: #2d3a4b;
  .el-form {
    .title {
      font-size: 26px;
      color: #fff;
      text-align: center;
      margin-bottom: 20px;
    }
    width: 350px;

    .el-form-item__content {
      margin: 0 !important;
      .el-button {
        width: 100%;
      }
      .el-input__inner {
        text-indent: 8px;
      }
      .iconfont {
        color: black;
        font-weight: 700;
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
}
</style>