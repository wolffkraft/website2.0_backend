const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  blogId: {type: Number, required: true},
  title:{type: String, required: true},
  blogType:{type: String, required: true},
  previewImageURL:{type: String, required: true},
  detailPageImageURL:{type: String, required: true},
  subtitle:{type: String},
  redirectText: String,
  read_time: String,
  featured: Boolean,
  likes_count: Number,
  dislikes_count: Number,
  content:[{
    type:{type: String, required: true},
    level: String,
    value: String,
    containerStyle: Object,
    contentStyle: Object,
    quoteStyle: Object,
    firstLetter: Boolean,
    mediaType: String,
    mediaList: [{
      name: String,
      imageURL: String,
      videoURL: String,
      videoType: String,
      srcSet: String,
      grid: String
    }]
  }]
},{
  timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog