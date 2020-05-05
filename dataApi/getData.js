let result = {}
const dataRes = require("../recycle/dataRequest")

//vihu-------data
const vihuList = require("../models/vihuHot")
const vihuURL = "https://www.zhihu.com/hot"
const vihuOptions = {
  method: "get",
  headers: {
    'cookie': `capsion_ticket="2|1:0|10:1584882057|14:capsion_ticket|44:ODlhY2VjZWI3MmFlNGU3Zjg1MGFmMGJiZWViMjRjY2Q=|20f8567308f8fa6d5a14b1d831f65b94fa311e4d076517c2632cba46ffa0f68f"; r_cap_id="OTVmNjA2YmFkMjZlNDE0MWE3ZjFjNTcxZDFhYTM2MzY=|1584882083|7330e073567cc6ee217433d7a7cf1bb7e0fbaf4a"; cap_id="MTUxZGEwZTRlZDM2NGMzN2E4YTllZWIzYTQ5YTFkNzI=|1584882082|554978643c6b15a2bfd8e36f603387306c257bbc"; l_cap_id="MzFhYTEyYzllZDkwNDVmOGE1NjU3N2E3NWQ0MTM0ZDA=|1584882083|027c2203bd6b5d90bece6a9f63700a4a0233f8dc"; z_c0=Mi4xOG1GSUFBQUFBQUFBb0JobVJKQUFFUmNBQUFCaEFsVk5ycTlrWHdDU0IyWkJvOUZIY0RuSDgyaWdhNTd3bWZMbVpR|1584882094|c59ed9ed3ea8f8686dbff0b197133099e6ce5635; q_c1=b0fdd74c8c05428492aaed6b7c01ef41|1585124419000|1585124419000; _zap=63f5e88b-f543-44af-98a5-49465d0ed979; d_c0="ACAb7kBNDBGPTp_nap7FhEymbUXtQnOkUb0=|1585663334"; ISSW=1; _ga=GA1.2.403220083.1585999295; _gid=GA1.2.668794898.1585999295; tshl=; _xsrf=3Gtf4VWqrzUod7OymgbPmbopDwuZfhec; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1587008276,1587008365,1587011292,1587043713; SESSIONID=UT0KEDZrOTzzjesK6egoqfQMevKBtHOrt77ZrS34QAW; JOID=V10dBU8JZFzD4dRbFQrFhIcTCXoJXD1iiqWQDGlHMCu3ibAoU4A6yJ7g2VgZrsvTmp5hwGrmNREfLvCqM372wpQ=; osd=UlEdA04MaFzF4NFXFQzEgYsTD3sMUD1ki6CcDG9GNSe3j7EtX4A8yZvs2V4Yq8fTnJ9kzGrgNBQTLvarNnL2xJU=; tst=h; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1587091132; KLBRSID=81978cf28cf03c58e07f705c156aa833|1587091519|1587091030`,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36 Edg/80.0.361.109'
  }
}
const vihuGeting = [vihuURL, vihuOptions]

//wzbo-------data
const wzboList = require("../models/wzboHot")
const wzboURL = "https://s.weibo.com/top/summary?cate=realtimehot"
const wzboOptions = {
  method: "get"
}
const wzboGeting = [wzboURL, wzboOptions]
const dataGetings = [vihuGeting, wzboGeting]
/**
 * 处理数据
 */
async function getData() {
  try {
    const start = new Date()
    //并发加载
    const getings = dataGetings.map(async item => {
      return await dataRes(item[0], item[1])
    })
    const v = vihuList(await getings[0])
    const w = wzboList(await getings[1])
    //继发加载
    // const getVihu = await dataRes(vihuURL, vihuOptions)
    // const getWzbo = await dataRes(wzboURL, wzboOptions)
    // v = vihuList(getVihu)
    // w = wzboList(getWzbo)
    result.v = v
    result.w = w
    const end = new Date()
    console.log(end - start);
  } catch (err) {
    console.log(err);
  }
}
setInterval(() => {
  getData()
}, 2000)

// setInterval(()=>{
// getData().then(res => {
//   result.v = res.v
//   result.w = res.w
// })
// },6000)
module.exports = result