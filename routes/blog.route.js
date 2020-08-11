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
  const blogId = req.body.blogId;
  const title = req.body.title;
  const blogType = req.body.blogType;
  const previewImageURL = req.body.previewImageURL;
  const detailPageImageURL = req.body.detailPageImageURL;
  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const redirectText = req.body.redirectText;
  const read_time = req.body.read_time;
  const featured = req.body.featured;
  const dislikes_count = 0;
  const likes_count = 0;

  const newBlog = new Blog({
    blogId,
    title,
    blogType,
    previewImageURL,
    detailPageImageURL,
    subtitle,
    redirectText,
    read_time,
    featured,
    likes_count,
    dislikes_count,
    content
  })
  newBlog.save()
   .then(() => res.json('Blog added!'))
   .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/:id').get((req, res) => {
  
  Blog.find({ "blogId": req.params.id })
  // Blog.findById(req.params.id)
    .then(blog => {
        
        let newBlog = JSON.parse(JSON.stringify(blog))
        console.log("BLOG",newBlog);
        let galleryImages = [];
        
        if(blog[0].previewImageURL){          
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Blog Preview Image',
            imageURL: blog[0].previewImageURL
          })
        }
        if(blog[0].detailPageImageURL){
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Blog Image',
            imageURL: blog[0].detailPageImageURL
          })
        }
        console.log("c",blog[0].content);
        if(blog[0].content) {
          console.log("blog content");
          _.forEach(blog[0].content, (item) => {
            // console.log('Here',  _.concat(galleryImages,item.mediaList))
            if(item.mediaList && item.mediaList.length >0){
              galleryImages = _.concat(galleryImages,item.mediaList)
            }
          })
        }
        newBlog[0]["galleryImages"] = galleryImages
        
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

router.post('/:id/act', (req, res, next) => {
  const action = req.body.action;

  // const counter
  // const counter = req.body.action ? 1 : -1;
  let params
  if(action === 'like'){

    if(req.body.counter === "1"){
      params = {$inc: {likes_count: 1}}
    } else if(req.body.counter === "-1"){
      params = {$inc: {likes_count: -1}}
    }
    
  } else if(action === 'dislike'){
    if(req.body.counter === "1"){
      params = {$inc: {dislikes_count: 1}}
    } else if(req.body.counter === "-1"){
      params = {$inc: {dislikes_count: -1}}
    }
    // params = {$inc: {dislikes_count: parseInt(req.body.counter)}}
  }
  Blog.findByIdAndUpdate({_id: req.params.id}, params, {}, (err, numberAffected) => {
      res.send('Updated');
  });
});

module.exports = router
