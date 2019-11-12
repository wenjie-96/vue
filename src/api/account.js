/* 
账户管理接口
*/

import req from "../utils/request"
//添加账户
export const addAccount =params=>req.post("/account/accountadd",params)

//获取用户列表
export const getAccount =params=>req.get("/account/accountlist",params)

//删除
export const accountDel =params=>req.get("/account/accountdel",params)

//批量删除
export const batchDel =params=>req.get("/account/accountbatchdel",params)

//修改数据
export const editAccount =params=>req.post("/account/accountedit",params)

//登录
export const checklogin =params=>req.post("/account/checklogin",params)

//验证旧密码
export const checkOldPwd = params => req.get('/account/checkoldpwd', params)

//修改密码
export const editPassword =params=>req.post("/account/passwordedit",params)


//获取个人信息
export const getPersonInfo =()=>req.get("/account/accountinfo")

//修改头像
export const editImg =params=>req.get("/account/avataredit",params)