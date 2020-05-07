const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title:{type: String, required: true},
  blogType:{type: String, required: true},
  previewImageURL:{type: String, required: true},
  detailPageImageURL:{type: String, required: true},
  subtitle:{type: String},
  redirectText: String,
  read_time: String,
  featured: Boolean,
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

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog