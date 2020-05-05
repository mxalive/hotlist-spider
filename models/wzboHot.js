const cheerio = require("cheerio")
const dataSchemas = require('../db/db')
const Wzbo = dataSchemas.Wzbo

/**
 * 定义函数事件
 */
//处理数据
function handleData(html) {
  const $ = cheerio.load(html)
  let result=[]
  // result.splice(0, result.length)
  Wzbo.deleteMany({ nameId: "wzbo" }, err => {
    if (err) {
      console.log(err);
    }
  })
  $("tbody").find("tr").each((i, elem) => {
    const index = $('tr').eq(i + 1).find("td.td-01").text()
    const title = $('tr').eq(i + 1).find("td.td-02 a").text()
    const link = "https://s.weibo.com/"+$('tr').eq(i + 1).find("td.td-02 a").attr('href')
    const hotIndex = $('tr').eq(i + 1).find("td.td-02 span").text()
    const expression = $('tr').eq(i + 1).find("td.td-02 img").attr('src')
    const indexLabel = $('tr').eq(i + 1).find("td.td-03").text()
    const wzboList = new Wzbo({
      index, title, link, hotIndex, expression, indexLabel
    })
    wzboList.save(err => {
      if (err) {
        console.log(err);
      }
    })
    result.push(wzboList)
  })
  return result
}
module.exports = handleData