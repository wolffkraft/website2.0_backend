const _ = require('lodash')
const router = require('express').Router()
let Blog = require('../models/blog.model')

router.route('').get((req, res) => {
    Blog.find()
    .then(blogs => {
      blogs = _.map(blogs, (blog) =>{
        let newBlog = JSON.parse(JSON.stringify(blog))
        let galleryImages = [];
        if(blog.previewImageURL){          
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Blog Preview Image',
            imageURL: blog.previewImageURL
          })
        }
        if(blog.detailPageImageURL){
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Blog Image',
            imageURL: blog.detailPageImageURL
          })
        }
        if(blog.content){

          _.forEach(blog.content, (item) => {
            // console.log('Here',  _.concat(galleryImages,item.mediaList))
            if(item.mediaList && item.mediaList.length >0){
              galleryImages = _.concat(galleryImages,item.mediaList)
            }
          })
        }
        newBlog["galleryImages"] = galleryImages
        return newBlog
      })
      res.status(200).json({
      results: blogs,
      total: blogs.length
    })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('').post((req,res) => {
  const title = req.body.title;
  const blogType = req.body.blogType;
  const previewImageURL = req.body.previewImageURL;
  const detailPageImageURL = req.body.detailPageImageURL;
  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const redirectText = req.body.redirectText;
  const read_time = req.body.read_time;

  const newBlog = new Blog({
    title,
    blogType,
    previewImageURL,
    detailPageImageURL,
    subtitle,
    redirectText,
    read_time,
    content
  })
  newBlog.save()
   .then(() => res.json('Blog added!'))
   .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/:id').get((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
        let newBlog = JSON.parse(JSON.stringify(blog))
        let galleryImages = [];
        if(blog.previewImageURL){          
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Blog Preview Image',
            imageURL: blog.previewImageURL
          })
        }
        if(blog.detailPageImageURL){
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Blog Image',
            imageURL: blog.detailPageImageURL
          })
        }
        if(blog.content){

          _.forEach(blog.content, (item) => {
            // console.log('Here',  _.concat(galleryImages,item.mediaList))
            if(item.mediaList && item.mediaList.length >0){
              galleryImages = _.concat(galleryImages,item.mediaList)
            }
          })
        }
        newBlog["galleryImages"] = galleryImages
       
      res.status(200).json({
        data: newBlog
      })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})
router.route('/:id').delete((req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(blogs => {
      res.status(200).json('Blog deleted!')
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})
router.route("/:id").post(function(req, res) {
    Blog.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json('Blog updated!')
      }
    }
  );
});

module.exports = router
