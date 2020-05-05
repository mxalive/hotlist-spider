const Koa = require("koa")
const router = require("koa-router")()
const app = new Koa()
const dataRouters = require('./routes/routers')
/**
 * 路由
 */
router.use('/mxa', dataRouters.routes(), dataRouters.allowedMethods())
// 注册路由
app.use(router.routes(), router.allowedMethods())
app.listen(3000, () => {
  console.log("server started on 3000")
})