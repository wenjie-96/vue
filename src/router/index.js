import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "",
    component: () => import("../views/login.vue")
  },
  {
    path: "/login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    children: [{
        path: "",
        component: () => import("../views/Index.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home', title: '后台首页' }
          ]
        },
      },
      {
        path: "index",
        component: () => import("../views/Index.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home', title: '后台首页' }
          ]
        },
      },
      {
        path: "ordermanagement",
        component: () => import("../views/Order/OrderManagement.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordermanagement', title: '订单管理' },
            
          ]
        },
      },
      {
        path: "order",
        component: () => import("../views/Order/Order.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordermanagement', title: '订单管理' },
            { path: '/home/order', title: '订单详情' },
            
          ]
        },
      },
      {
        path: "productlist",
        component: () => import("../views/ProductManagement/ProductList.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/productlist', title: '商品管理' },
            { path: '/home/productlist', title: '商品列表' },
          ]
        },
      },
      {
        path: "addproduct",
        component: () => import("../views/ProductManagement/AddProduct.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/productlist', title: '商品管理' },
            { path: '/home/addproduct', title: '添加商品' },
            
          ]
        },
      },
      {
        path: "editproduct",
        component: () => import("../views/ProductManagement/EditProduct.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/productlist', title: '商品管理' },
            { path: '/home/editproduct', title: '修改商品' },
            
          ]
        },
      },
      {
        path: "shopmanagement",
        component: () => import("../views/ShopManagement.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/shopmanagement', title: '店铺管理' },
            
          ]
        },
      },
      {
        path: "accountlist",
        component: () => import("../views/AccountManagement/AccountList.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountlist', title: '账号管理' },
            { path: '/home/accountlist', title: '账号列表' },
            
          ]
        },
      },
      {
        path: "addaccount",
        component: () => import("../views/AccountManagement/AddAccount.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountlist', title: '账号管理' },
            { path: '/home/addaccount', title: '添加账号' },
            
          ]
        },
      },
      {
        path: "changepassword",
        component: () => import("../views/AccountManagement/ChangePassword.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountlist', title: '账号管理' },
            { path: '/home/changepassword', title: '修改密码' },
            
          ]
        },
      },
      {
        path: "ordertotal",
        component: () => import("../views/SaleTotal/OrderTotal.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordertotal', title: '销售统计' },
            { path: '/home/ordertotal', title: '订单统计' },
            
          ]
        },
      },
      {
        path: "producttotal",
        component: () => import("../views/SaleTotal/ProductTotal.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordertotal', title: '销售统计' },
            { path: '/home/producttotal', title: '商品统计' },
            
          ]
        },
      },
      {
        path:"person",
        component:()=>import("../views/Person.vue"),
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/person', title: '个人中心' }
          ]
        },
      }
    
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router