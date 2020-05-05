const Router = require("koa-router")
const router = new Router()
const results = require("../dataApi/getData")
//注册接口
router.get('/', ctx => {
  ctx.body = { msg: "hello koa" }
})
  .get("/vihuHot", ctx => {
    //获取数据
    ctx.body=results.v
  })
  .get("/wzboHot", async ctx => {
    ctx.body=results.w
  })
module.exports = router