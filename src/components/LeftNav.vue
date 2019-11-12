<template>
  <div class="left-nav">
    <el-aside width="200px">
      <el-menu
        :default-active="path"
        class="el-menu-vertical-demo"
        unique-opened
        router
        background-color="#304156"
        text-color="#fff"
      >
        <template v-for="(item,index) in menu">
          <!-- 后台首页 -->
          <el-menu-item v-if="!item.children" :index="item.path" :key="index">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>

          <!-- 商品管理 -->
          <el-submenu v-else :index="item.path" :key="index">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>

            <el-menu-item
              v-for="(v,index) in item.children"
              :index="v.path"
              :key="index"
            >{{v.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import local from "../utils/local"
export default {
  data() {
    return {
      menu: [
       
      ]
    };
  },
  computed: {
    path() {
      if (this.$route.path === "ordermanagement") {
        return "/home/ordermanagement";
      } else if (this.$route.path.includes("editproduct")) {
        return "/home/productlist";
      } else if (this.$route.path === "/home/producttotal") {
        return "/home/producttotal";
      }
      return this.$route.path;
    }
  },
  created(){
    let role = local.get("role")

    let newMenu =[
       {
          path: "/home/index",
          icon: "icon-tianchongxing-",
          title: "后台首页",
          meta: {
            role: ["super", "general"]
          }
        },
        {
          path: "/home/ordermanagement",
          icon: "icon-dingdan",
          title: "订单管理",
          meta: {
            role: ["super", "general"]
          }
        },
        {
          path: "/home/productmanagement",
          icon: "icon-shangpin",
          title: "商品管理",
          children: [
            {
              path: "/home/productlist",
              title: "商品列表"
            },
            {
              path: "/home/addproduct",
              title: "添加商品"
            }
          ],
          meta: {
            role: ["super", "general"]
          }
        },
        {
          path: "/home/shopmanagement",
          icon: "icon-ai204",
          title: "店铺管理",
          meta: {
            role: ["super", "general"]
          }
        },
        {
          path: "/home/accountmanagement",
          icon: "icon-zhanghaoguanli",
          title: "账号管理",
          children: [
            {
              path: "/home/accountlist",
              title: "账户列表"
            },
            {
              path: "/home/addaccount",
              title: "添加账号"
            },
            {
              path: "/home/changepassword",
              title: "修改密码"
            }
          ],
          meta: {
            role: ["super"]
          }
        },
        {
          path: "/home/seletotal1",
          icon: "icon-tongji",
          title: "销售统计",
          children: [
            {
              path: "/home/producttotal",
              title: "商品统计"
            },
            {
              path: "/home/ordertotal",
              title: "订单统计"
            }
          ],
          meta: {
            role: ["super"]
          }
        }
    ]

    let newArr =newMenu.filter(v=> v.meta.role.includes(role))

    this.menu=newArr

  }
};
</script>

<style lang="less" >
.left-nav {
  .el-aside {
    background: #304156;
    height: 100%;
    .el-menu {
      border: none;
      .iconfont {
        margin: 8px;
      }
      .el-submenu {
        .el-menu-item {
          text-indent: 20px;
        }
      }
    }
  }
}
</style>