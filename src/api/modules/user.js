import fetch from '../http.js'

// 更新做表前用户信息
export const userCreate = data => fetch({
  url: '/api/user/table/info',
  method: 'post',
  data
})
// 获取做表前用户信息
export const getUserCreate = params => fetch({
  url: '/api/user/table/info',
  method: 'get',
  params
})

// 获取所有表的相关信息
export const getAllTable = () => fetch({
  url: '/api/table/all',
  method: 'get'
})

// 获取用户信息
export const getUserInfo = () => fetch({
  url: '/api/user/me',
  method: 'get'
})
// 更新用户信息
export const updateInfo = data => fetch({
  url: '/api/user/update',
  method: 'post',
  data
})

/*****************************
 *     用户测试相关配置
 *****************************/

// 获取最新未完成的批次
export const getUserBatch = () => fetch({
  url: '/api/user/batch/tables',
  method: 'get'
}, false)

// 提交用户选择的量表
export const postUserTables = (data) => fetch({
  url: '/api/user/batch/tables',
  method: 'post',
  data
})

/*****************************
 *           做题
 *****************************/

// 获取测试结果
export const getReportRes = (params, errMessage = true) => fetch({
  url: '/api/user/batch/report',
  method: 'get',
  params
}, errMessage)

// 获取单题题目
export const getTableQues = (params) => fetch({
  url: '/api/user/table/question',
  method: 'get',
  params
})
// 提交单题题目
export const postTableQues = (data) => fetch({
  url: '/api/user/table/question',
  method: 'post',
  data
})

// 提交单题信息
export const posTableQues = (data) => fetch({
  url: `/api/user/table/question?sessionId=${data.sessionId}`,
  method: 'post',
  data
}, false)

// 完成指定量表
export const postTableRes = data => fetch({
  url: '/api/user/table/finish',
  method: 'post',
  data
})

// 提交信息
// export const postTestRes = data => fetch({
//   url: '/api/answer',
//   method: 'post',
//   data
// })

// 获取用户历史批次列表
export const getOrganization = (params) => fetch({
  url: '/api/user/history/organization',
  method: 'get',
  params
})

// 全部量表分类
export const tableTypeList = (params) => fetch({
  url: '/api/table/selfTableType/retrieveType',
  method: 'get',
  params
})

// 获取用户测试记录
export const getIndividual = (params) => fetch({
  url: '/api/user/history/individual',
  method: 'get',
  params
})

// 获取用户收藏
export const getCollect = (params) => fetch({
  url: '/api/user/table/collection',
  method: 'get',
  params
})

// 获取测试需要完成的量表信息
export const batchInfo = (params) => fetch({
  url: '/api/user/batch/info',
  method: 'get',
  params
})

// 获取测试需要完成的量表信息
export const orgBind = (params) => fetch({
  url: '/api/user/orgBind/check',
  method: 'get',
  params
}, false)

// 机构绑定新增
export const orgBindAdd = data => fetch({
  url: '/api/user/orgBind/create',
  method: 'post',
  data
}, false)

// 查看机构测试记录
export const organization = (params) => fetch({
  url: '/api/user/history/organization',
  method: 'get',
  params
})

// 查看CBT测试记录
export const cbtCourse = (params) => fetch({
  url: '/api/cbtCourse/batch/bindList',
  method: 'get',
  params
})

// 签到领取云愈币list
export const signInFind = () => fetch({
  url: '/api/user/sign-in/find',
  method: 'get'
})

// 签到云愈币
export const signInCreate = () => fetch({
  url: '/api/user/sign-in/create',
  method: 'post'
}, false)

// 新人有礼
export const newUserReward = () => fetch({
  url: '/api/user/newUserReward',
  method: 'post'
}, false)

// 获取H5营销活动列表
export const h5ActivitylList = params => fetch({
  url: '/api/h5Activity/list',
  method: 'get',
  params
})

// 查询cbt推荐配置列表
export const cbtCourseList = params => fetch({
  url: '/api/cbtCourse/themeCourseList',
  method: 'get',
  params
})

// 查询小愈精选
export const carefulSelection = params => fetch({
  url: '/api/app/careful/selection',
  method: 'get',
  params
})

// 查询cbt课程列表
export const courseList = params => fetch({
  url: '/api/cbtCourse/courseList',
  method: 'get',
  params
})

// 查询指定课程详情
export const userCourseInfo = params => fetch({
  url: '/api/cbtCourse/h5/userCourseInfo',
  method: 'get',
  params
})

export const userThemeCourseList = params => fetch({
  url: '/api/cbtCourse/userThemeCourseList',
  method: 'get',
  params
})

export const userCourseList = params => fetch({
  url: '/api/cbtCourse/userCourseList',
  method: 'get',
  params
})
