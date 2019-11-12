<template>
  <div class="edit-product">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑商品</span>
      </div>
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="产品名称" prop="goodsname">
            <el-input v-model="form.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="产品分类" prop="goodscategory">
            <el-select v-model="form.goodscategory" placeholder="请选择活动区域">
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="炸鸡汉堡" value="炸鸡汉堡"></el-option>
              <el-option label="日料" value="日料"></el-option>
              <el-option label="美味面食" value="美味面食"></el-option>
              <el-option label="中餐" value="中餐"></el-option>
              <el-option label="西餐" value="西餐"></el-option>
              <el-option label="火锅" value="火锅"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品特色" prop="goodsfeature">
            <el-checkbox-group v-model="form.goodsfeature">
              <el-checkbox label="祖传老味道" name="type"></el-checkbox>
              <el-checkbox label="快餐" name="type"></el-checkbox>
              <el-checkbox label="炸鸡汉堡" name="type"></el-checkbox>
              <el-checkbox label="本地特色" name="type"></el-checkbox>
              <el-checkbox label="全国连锁" name="type"></el-checkbox>
              <el-checkbox label="口口相传" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              :action="serverApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="form.imgUrl"
                style="width: 100px; height: 100px"
                :src="serverApi + form.imgUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="是否促销" prop="isPromotion">
            <el-radio-group v-model="form.isPromotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="食品规格" prop="goodsstandard">
            <el-radio-group v-model="form.goodsstandard">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 单规格 -->
          <div v-show="this.form.goodsstandard==='单规格'">
            <el-form-item label="包装费" prop="packingexpense">
              <el-input-number v-model="form.packingexpense" :min="1" :max="40" label="描述文字"></el-input-number>
            </el-form-item>

            <el-form-item label="价格" prop="goodsPrice" class="desc">
              <el-input-number v-model="form.goodsPrice" :min="1" :max="100" label="描述文字"></el-input-number>
            </el-form-item>
          </div>
          <!-- 多规格 -->
          <div v-show="this.form.goodsstandard==='多规格'" class="sizeBox">
            <el-button class="addBtn" type="primary" @click.native="add">添加规格</el-button>

            <el-table :data="form.tableData" style="width: 100%">
              <el-table-column label="规格" width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.goodsstandard }}</span>
                </template>
              </el-table-column>

              <el-table-column label="包装费" width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.packingexpense }}</span>
                </template>
              </el-table-column>
              <el-table-column label="价格" width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.goodsPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--多规格模态框  -->

          <el-dialog title="多规格" :visible.sync="dialogFormVisible">
            <el-form :model="addSizeForm">
              <el-form-item
                label="规格"
                prop="goodsstandard"
                style="width:300px"
                :label-width="formLabelWidth"
              >
                <el-input v-model="addSizeForm.goodsstandard" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="包装费" prop="packingexpense" :label-width="formLabelWidth">
                <el-input-number
                  v-model="addSizeForm.packingexpense"
                  :min="1"
                  :max="40"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="价格" prop="goodsPrice" :label-width="formLabelWidth">
                <el-input-number v-model="addSizeForm.goodsPrice" :min="1" :max="100" label="描述文字"></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSize">确 定</el-button>
            </div>
          </el-dialog>

          <el-form-item label="产品描述" prop="goodsdesc">
            <el-input type="textarea" v-model="form.goodsdesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
            <el-button @click="reset">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入接口
import { editGoods } from "../../api/goods";
export default {
  data() {
    return {
      form: {
        id: "",
        goodsname: "",
        goodscategory: "",
        goodsfeature: ["祖传老味道"],
        imgUrl: "",
        isPromotion: "不促销",
        goodsstandard: "单规格",
        packingexpense: 1,
        goodsPrice: 20,
        goodsdesc: "",
        tableData: [
          {
            goodsstandard: "默认",
            packingexpense: "1",
            goodsPrice: "5"
          }
        ]
      },
      rules: {
        goodsname: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        goodscategory: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],

        goodsfeature: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        imgUrl: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],

        isPromotion: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],

        sigoodsstandardze: [
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
        goodsPrice: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        goodsdesc: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px",
      dialogFormVisible: false, //控制模态框显示
      addSizeForm: {
        goodsstandard: "",
        packingexpense: "",
        goodsPrice: ""
      },
      serverApi: "http://127.0.0.1:5000/upload/goods/"
    };
  },
  methods: {
    //提交
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          //准备参数
          let {
            id,
            goodsname,
            goodscategory,
            goodsfeature,
            imgUrl,
            isPromotion,
            goodsstandard,
            packingexpense,
            goodsPrice,
            goodsdesc,
            tableData
          } = this.form;

          let params = {
            id,
            goodsname,
            goodscategory,
            goodsfeature: JSON.stringify(goodsfeature),
            imgUrl,
            isPromotion,
            standard:
              goodsstandard === "单规格"
                ? JSON.stringify([
                    { goodsstandard, packingexpense, goodsPrice }
                  ])
                : JSON.stringify(tableData),
            goodsdesc
          };
          let { code } = await editGoods(params);

          if (code === 0) {
            this.$router.push("/home/productlist");
          }
        } else {
          this.$message.error("请填写完全");
        }
      });
    },
    reset() {
      this.$refs.form.resetFields();
    },
    add() {
      this.dialogFormVisible = true;
    },
    addSize() {
      this.dialogFormVisible = false;
      this.form.tableData.push(this.addSizeForm);
      this.addSizeForm = {
        goodsstandard: "",
        packingexpense: "",
        goodsPrice: ""
      };
    },
    //删除规格
    handleDelete(index) {
      this.form.tableData.splice(index, 1);
    },
    //上传成功的回调
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.form.imgUrl = imgUrl;
      }
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG  或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    }
  },
  created() {
    let product = JSON.parse(window.sessionStorage.getItem("product"));
    this.form.id = product.id;
    this.form.goodsname = product.goodsname;
    this.form.goodscategory = product.goodscategory;
    this.form.goodsfeature = JSON.parse(product.goodsfeature);
    this.form.imgUrl = product.imgUrl;
    this.form.isPromotion = product.isPromotion;
    this.form.goodsdesc = product.goodsdesc;
    let standard = JSON.parse(product.standard);

    if (standard[0].goodsstandard === "单规格") {
      //单规格
      this.form.goodsstandard = "单规格";
      this.form.packingexpense = standard[0].packingexpense;
      this.form.goodsPrice = standard[0].goodsPrice;
    } else {
      //多规格
      this.form.goodsstandard = "多规格";
      this.form.tableData = JSON.parse(product.standard);
    }
  }
};
</script>

<style lang="less" scoped>
.edit-product {
  .el-form {
    width: 600px;
  }
  .el-dialog__body {
    .el-form-item__content {
      width: 300px;
      text-align: right;
      .el-input {
        width: 180px;
      }
    }
  }
  .desc {
    margin-top: 20px;
  }
  .addBtn {
    margin-left: 250px;
  }
  .sizeBox {
    margin-bottom: 30px !important;
  }
}
</style>