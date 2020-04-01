//导入内嵌路由组件
import chart from '../view/chart/index.vue'
import question from '../view/question/index.vue'
import subject from "../view/subject/index.vue"
import user from "../view/user/index.vue"
import enterprise from "../view/enterprise/index.vue"

export default [
    { path: "chart", component: chart, meta: { title: "数据概览", roles: ["超级管理员","管理员", "老师"], fullpath: "/index/chart", icon: "el-icon-pie-chart" } },
    { path: "question", component: question, meta: { title: "题库列表", roles: ["超级管理员","管理员", "老师", "学生"], fullpath: "/index/question", icon: "el-icon-edit-outline" } },
    { path: "subject", component: subject, meta: { title: "学科列表", roles: ["超级管理员","管理员"], fullpath: "/index/subject", icon: "el-icon-refrigerator" } },
    { path: "user", component: user, meta: { title: "用户列表", roles: ["超级管理员","管理员", "老师"], fullpath: "/index/user", icon: "el-icon-user" } },
    { path: "enterprise", component: enterprise, meta: { title: "企业列表", roles: ["超级管理员","管理员"], fullpath: "/index/enterprise", icon: "el-icon-office-building" } },
]