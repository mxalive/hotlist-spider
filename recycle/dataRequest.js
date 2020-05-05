const https = require("https")
function dataRes(webUrl, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(webUrl, options, (res) => {
      let chunks = []
      let size = 0
      res.on('data', (chunk) => {
        chunks.push(chunk)
        size += chunk.length
      });
      res.on("end", () => {
        let data = Buffer.concat(chunks, size)
        let html = data.toString();
        //获取数据并作相应处理
        resolve(html)
      })
    });
    req.on('error', (e) => {
      console.log(e);
    });
    req.end();
  })
}
module.exports = dataRes