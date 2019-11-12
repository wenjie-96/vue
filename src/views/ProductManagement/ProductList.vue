<template>
  <div class="productlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品列表</span>
      </div>
      <div>
        <el-table :data="productlistData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.goodsname }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品特色">
                  <span>{{ props.row.goodsfeature | filterFeature }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <span>
                    {{ props.row.shopId }}
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="serveApi+props.row.imgUrl"
                      fit="fit"
                    ></el-image>
                  </span>
                </el-form-item>
                <el-form-item label="是否促销">
                  <span>{{ props.row.isPromotion }}</span>
                </el-form-item>
                <el-form-item label="商品规格">
                  <span>{{ props.row.standard | filterStandard }}</span>
                </el-form-item>

                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsdesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="id"></el-table-column>
          <el-table-column label="商品名称" prop="goodsname"></el-table-column>
          <el-table-column label="描述" prop="goodsdesc"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 8, 10]"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from "../../api/goods";
export default {
  data() {
    return {
      //数据
      productlistData: [],
      currentPage: 1,
      pageSize: 5,
      total: 30,
      serveApi: "http://127.0.0.1:5000/upload/goods/"
    };
  },
  methods: {
    async getGoods() {
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this.total = total;
      this.productlistData = data;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    edit(row){
      window.sessionStorage.setItem("product",JSON.stringify(row))

      this.$router.push("/home/editproduct")
    }
  },
  created() {
    this.getGoods();
  },
  filters: {
    //过滤商品特色
    filterFeature(val) {
      return JSON.parse(val).join(" / ");
    },
    //过滤商品规格
    filterStandard(s) {
      let arr =JSON.parse(s)
     return arr.map(v=>`${v.goodsstandard} 价格： ${v.goodsPrice} 包装费: ${v.packingexpense}`).join("||")
    }
  }
};
</script>

<style lang="less" scoped>
.productlist {
  //表格下拉内容样式
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .pages {
    margin-top: 30px;
    margin-left: 200px;
  }
}
</style>