const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const casestudySchema = new Schema({
  title:{type: String, required: true},
  domainType:{type: String, required: true},
  domainName:{type: String, required: true},
  previewImageURL:{type: String, required: true},
  detailPageImageURL:{type: String, required: true},
  subtitle:{type: String},
  read_time:{type: String, required: true},
  featured:{type: Boolean, required: true},
  tags:{type: [String], required: true},
  client:{type: String,  required: true},
  project:{type: String, required: true},
  platform:{type: String, required: true},
  redirectText: String,
  audio: [{
    srcURL: String,
    title: String,
    subtitle: String
  }],
  content:[{
    type:{type: String, required: true},
    title: String,
    description: String,
    gridType: String,
    mediaList: [{
      name: String,
      imageURL: String,
      grid: String
    }]
  }]
},{
  timestamps: true
})

const Casestudy = mongoose.model('Casestudy', casestudySchema)

module.exports = Casestudy