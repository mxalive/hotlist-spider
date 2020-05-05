const mongoose = require("mongoose")
const Schema = mongoose.Schema
const learningDB = "mongodb://hotlist:hotlist@112.126.87.103:27017/hotlist"
const connectionL = mongoose.createConnection(learningDB, {
  useNewUrlParser: true, useUnifiedTopology: true
})
connectionL.then(() => {
  console.log("mongodb connect to:", learningDB);
}).catch(err => {
  console.log(err);

})
const vihuHotSchema = new Schema({
  index: {
    type: String,
    required: true
  },
  indexLabel: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  hotIndex: {
    type: String,
    required: true
  },
  nameId: {
    type: String,
    default: "vihu"
  }
})
const wzboHotSchema = new Schema({
  index: {
    type: String,
    default:true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  hotIndex: {
    type: String,
    default: ""
  },
  expression: {
    type: String,
    default: ""
  },
  indexLabel: {
    type: String,
    default: ""
  },
  nameId:{
    type:String,
    default:"wzbo"
  }
})
const Vihu = connectionL.model("vihuHot", vihuHotSchema)
const Wzbo = connectionL.model("wzboHot", wzboHotSchema)
module.exports = { Vihu, Wzbo } 