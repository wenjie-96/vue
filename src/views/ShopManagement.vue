<template>
  <div class="shop-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
      </div>
      <div>
        <el-form
          :disabled="isDisabled"
          ref="shopForm"
          :model="shopForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="店铺名称" prop="shopname">
            <el-input v-model="shopForm.shopname"></el-input>
          </el-form-item>

          <el-form-item label="详细地址" prop="address">
            <el-input v-model="shopForm.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="shopForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="shopdesc">
            <el-input v-model="shopForm.shopdesc"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="slogan">
            <el-input v-model="shopForm.slogan"></el-input>
          </el-form-item>

          <el-form-item label="店铺分类" prop="category">
            <el-select v-model="shopForm.category" placeholder="请选择活动区域">
              <el-option label="火锅" value="火锅"></el-option>
              <el-option label="中餐" value="中餐"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="店铺特点" prop="feature">
            <el-checkbox-group v-model="shopForm.feature">
              <el-checkbox label="蜂鸟专送" name="feature"></el-checkbox>
              <el-checkbox label="慢必赔" name="feature"></el-checkbox>
              <el-checkbox label="外卖保" name="feature"></el-checkbox>
              <el-checkbox label="开发票" name="feature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="包装费" prop="packingexpense">
            <el-input-number v-model="shopForm.packingexpense" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="起送价" prop="minprice">
            <el-input-number v-model="shopForm.minprice" :min="15" :max="100" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="营业时间" prop="date">
            <el-time-picker
              is-range
              v-model="shopForm.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            ></el-time-picker>

            <!-- <el-time-picker
              is-range
              arrow-control
              v-model="shopForm.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            ></el-time-picker> -->
          </el-form-item>

          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopForm.shopAvatar" :src="serveApi+shopForm.shopAvatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              :action="uploadApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.businessLicenseImg"
                :src="serveApi+shopForm.businessLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="食品许可证">
            <el-upload
              class="avatar-uploader"
              :action="uploadApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="shopForm.cateringServiceLicenseImg"
                :src="serveApi+shopForm.cateringServiceLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="优惠活动">
            <el-select @change="change" v-model="shopForm.specialOffer" placeholder="请选择优惠类型">
              <el-option label="新用户立减" value="新用户立减"></el-option>
              <el-option label="进店领券" value="进店领券"></el-option>
              <el-option label="满减钜惠" value="满减钜惠"></el-option>
            </el-select>
          </el-form-item>

          <!-- 活动表格 -->
          <el-table :data="shopForm.tableData" style="width: 100%">
            <el-table-column label="活动标题" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>

            <el-table-column label="活动名称" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="活动详情" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.content }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="submitList">编辑</el-button>
          <el-button @click="saveList">保存</el-button>
        </div>

        <!-- 模态框 -->
        <el-dialog class="box" title="活动详情" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="活动内容" :label-width="formLabelWidth">
              <el-input v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="comfirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { editShop, getShop } from "../api/shop";
export default {
  data() {
    return {
      shopForm: {
        shopname: "",
        address: "",
        phone: "",
        shopdesc: "",
        slogan: "",
        category: "",
        feature: [],
        packingexpense: "",
        minprice: "",
        date: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        shopAvatar: "",
        businessLicenseImg: "",
        cateringServiceLicenseImg: "",
        specialOffer: "",
        tableData: []
      },
      form: {
        content: ""
      },
      rules: {
        shopname: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        shopdesc: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],

        slogan: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        feature: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],

        packingexpense: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],

        minPrice: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ]
      },
      isDisabled: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      uploadApi: "http://127.0.0.1:5000/shop/upload",
      serveApi: "http://127.0.0.1:5000/upload/shop/"
    };
  },
  methods: {
    submitList() {
      this.isDisabled = false;

      this.$refs.shopForm.validate(valid => {
        if (valid) {

          //等后台的了
        } else {
          this.$message.error("请填写完整");
        }
      });
    },
    saveList() {
      this.isDisabled = true;
      this.editInfo()
    },
    change() {
      this.dialogFormVisible = true;
    },
    comfirm() {
      this.dialogFormVisible = false;

      let specialOffer = this.shopForm.specialOffer;

      let title;

      if (specialOffer === "新用户立减") {
        title = "减";
      } else if (specialOffer === "进店领券") {
        title = "券";
      } else if (specialOffer === "满减钜惠") {
        title = "满";
      }

      let obj = {
        title,
        name: this.shopForm.specialOffer,
        content: this.form.content
      };
      this.shopForm.tableData.unshift(obj);
    },
    handleAvatarSuccess1(res) {
      let { code, imgUrl } = res;

      if (code === 0) {
        this.shopForm.shopAvatar = imgUrl;
      }
    },
    handleAvatarSuccess2(res) {
      let { code, imgUrl } = res;

      if (code === 0) {
        this.shopForm.businessLicenseImg = imgUrl;
      }
    },
    handleAvatarSuccess3(res) {
      let { code, imgUrl } = res;

      if (code === 0) {
        this.shopForm.cateringServiceLicenseImg = imgUrl;
      }
    },

    beforeAvatarUpload() {},
    async getInfo() {
      let { data } = await getShop();

      for (let key in data) {
        if (key === "date" || key === "feature" || key === "tableData") {
          data[key] = JSON.parse(data[key]);
        }
      }

      this.shopForm = { ...data };
    },
    async editInfo() {
      let params = {
        shopname: this.shopForm.shopname,
        address: this.shopForm.address,
        phone: this.shopForm.phone,
        shopdesc: this.shopForm.shopdesc,
        slogan: this.shopForm.slogan,
        category: this.shopForm.category,
        feature: JSON.stringify(this.shopForm.feature),
        packingexpense: this.shopForm.packingexpense,
        minprice: this.shopForm.minPrice,
        date: JSON.stringify(this.shopForm.date),
        shopAvatar: this.shopForm.shopAvatar,
        businessLicenseImg: this.shopForm.businessLicenseImg,
        cateringServiceLicenseImg: this.shopForm.cateringServiceLicenseImg,
        tableData: JSON.stringify(this.shopForm.tableData)
      };
      await editShop(params);
    },
    handleDelete(index){
      this.shopForm.tableData.splice(index,1)
    }
  },
  created() {
    this.getInfo()
  }
};
</script>

<style lang="less" >
.shop-management {
  .el-form {
    width: 650px;
    .el-table {
      margin-bottom: 20px;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9 !important;
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
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  }
  .btn {
    margin-left: 200px;
  }
  .box {
    .el-input {
      width: 300px;
    }
  }
}
</style>