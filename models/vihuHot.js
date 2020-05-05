const cheerio = require("cheerio")
const dataSchemas = require('../db/db')
const Vihu = dataSchemas.Vihu

  // dataRes().then(res => {
  //   handleData(res)
  // }).catch(err => {
  //   console.log(err);
  // })
/*
定义函数事件
*/

//处理数据
function handleData(html) {
  const $ = cheerio.load(html)
  let result=[]
  Vihu.deleteMany({ nameId: "vihu" }, err => {
    if (err) {
      console.log(err);
    }
  })
  $('div.HotList-list').find('section.HotItem').each((i, elem) => {
    const index = $('section.HotItem').eq(i).find('.HotItem-index .HotItem-rank').text()
    const indexLabel = $('section.HotItem').eq(i).find('.HotItem-index .HotItem-label').text()
    const link = $('section.HotItem').eq(i).find('.HotItem-content a').attr('href')
    const title = $('section.HotItem').eq(i).find('.HotItem-title').text()
    const description = $('section.HotItem').eq(i).find('.HotItem-content a p').text()
    const hotIndex = $('section.HotItem').eq(i).find('.HotItem-content .HotItem-metrics').text()
    const vihuList = new Vihu({
      index,
      indexLabel,
      link,
      title,
      description,
      hotIndex
    })
    vihuList.save(err => {
      if (err) {
        console.log(err);
      }
    })
    result.push(vihuList)
  })
  return result
}

module.exports =handleData
