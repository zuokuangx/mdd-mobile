import fetch from './http.js'

// 公共信息

// 获取侧边栏批次列表
export const batchMine = () => fetch({
  url: '/api/batch/mine',
  method: 'get'
})
// 获取个人信息
export const adminMe = () => fetch({
  url: '/api/admin/me',
  method: 'get'
})
// 修改密码
export const passwordUpdate = data => fetch({
  url: '/api/admin/password/update',
  method: 'post',
  data
})
// 获取骑牛token
export const qiniuToken = params => fetch({
  url: '/api/qiniu/token',
  method: 'get',
  params
})

// 获取指定量表信息
export const tableInfo = tableCode => fetch({
  url: '/api/table/info',
  method: 'get',
  params: {
    tableCode
  }
})

// 提交订单信息-普通用户
export const postTableOrder = data => fetch({
  url: '/api/user/v2/table/order',
  method: 'post',
  data
}, false)

// 提交订单信息-机构用户
export const postOrganOrder = data => fetch({
  url: '/api/user/org/personal/order',
  method: 'post',
  data
}, false)

// 提交微信授权code
export const postUserCode = code => fetch({
  url: '/api/user/wx/pubOauth',
  method: 'post',
  data: {
    code
  }
})

// 查询支付订单状态
export const getOrderState = orderId => fetch({
  url: '/api/user/order',
  method: 'get',
  params: {
    orderId
  }
})

// 检查用户登录
export const getUserAuth = () => fetch({
  url: '/api/user/auth',
  method: 'get'
}, false)

// 微信分享验签
export const wxSignatures = params => fetch({
  url: '/api/user/wx/jsSignature',
  method: 'get',
  params
})

// 提交指定量表信息
export const postTableRes = data => fetch({
  url: '/api/user/table/finish',
  method: 'post',
  data
})

// 获得cbt课程详情
export const getCbtCourseInfo = courseId => fetch({
  url: '/api/cbtCourse/h5/userCourseInfo',
  method: 'get',
  params: {
    courseId
  }
})
