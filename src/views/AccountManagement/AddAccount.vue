<template>
  <div class="addaccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">添加账号</span>
      </div>
      <div class="content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账户" prop="account">
            <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>


           <el-form-item label="用户组" prop="userGroup" >
              <el-select v-model="ruleForm.userGroup" placeholder="请选择用户组" >
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入工具函数
import { pwdReg } from "../../utils/reg";

//引入接口请求方法
import { addAccount } from "../../api/account";
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
      ruleForm: {
        account: "",
        password: "",
        userGroup: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入要添加的账户",
            trigger: "blur"
          },
          {
            min: 3,
            max: 6,
            message: "账户长度在3-6位",
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
        ],
        userGroup: [
          {
            required: true,
            message: "请选择对应等级",
            trigger: "blur"
          }
        ]
      },

      //下拉框的数据

      options: [
        {
          value: "超级管理员",
          label: "超级管理员"
        },
        {
          value: "普通管理员",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { code } = await addAccount(this.ruleForm);
          if (code === 0) {
          }

          this.$router.replace("accountlist");
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
.addaccount {
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
        .el-select{
          width: 100%;
          text-align: center!important
        }
      }

    }
  }
}
</style>