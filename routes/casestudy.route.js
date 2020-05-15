const _ = require('lodash')
const router = require('express').Router()
let Casestudy = require('../models/casestudy.model')

router.route('').get((req, res) => {
  Casestudy.find()
    .then(casestudies => {
      casestudies = _.map(casestudies, (casestudy) =>{
        let newCasestudy = JSON.parse(JSON.stringify(casestudy))
        let galleryImages = [];
        if(casestudy.previewImageURL){          
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Casestudy Preview Image',
            imageURL: casestudy.previewImageURL
          })
        }
        if(casestudy.detailPageImageURL){
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Casestudy Image',
            imageURL: casestudy.detailPageImageURL
          })
        }
        if(casestudy.content){

          _.forEach(casestudy.content, (item) => {
            // console.log('Here',  _.concat(galleryImages,item.mediaList))
            if(item.mediaList && item.mediaList.length >0){
              galleryImages = _.concat(galleryImages,item.mediaList)
            }
          })
        }
        newCasestudy["galleryImages"] = galleryImages
        return newCasestudy
      })
      res.status(200).json({
      results: casestudies,
      total: casestudies.length
    })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('/ids').get((req, res) => {
  console.log('Request', req.query)
  Casestudy.find({}, {"casestudyId": 1})
    .then(casestudies => {
      let ids = _.map(casestudies, (casestudy) => {
        return casestudy.casestudyId
      })
      res.status(200).json({
        results: ids
      })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('').post((req,res) => {
  const casestudyId = req.body.casestudyId;
  const title = req.body.title;
  const domainType = req.body.domainType;
  const domainName = req.body.domainName;
  const previewImageURL = req.body.previewImageURL;
  const detailPageImageURL = req.body.detailPageImageURL;
  const read_time = req.body.read_time;
  const subtitle = req.body.subtitle;
  const featured = req.body.featured;
  const tags = req.body.tags;
  const client = req.body.client;
  const project = req.body.project;
  const platform = req.body.platform;
  const content = req.body.content;
  const audio = req.body.audio;
  const redirectText = req.body.redirectText;

  const newCasestudy = new Casestudy({
    casestudyId,
    title,
    domainType,
    domainName,
    previewImageURL,
    detailPageImageURL,
    read_time,
    subtitle,
    featured,
    tags,
    client,
    project,
    platform,
    content,
    audio,
    redirectText
  })
  newCasestudy.save()
   .then(() => res.json('Casestudy added!'))
   .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/:id').get((req, res) => {
  Casestudy.find({ "casestudyId": req.params.id })
  // Casestudy.findById(req.params.id)
    .then(casestudy => {
        let newCasestudy = JSON.parse(JSON.stringify(casestudy))
        let galleryImages = [];
        if(casestudy.previewImageURL){          
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Casestudy Preview Image',
            imageURL: casestudy.previewImageURL
          })
        }
        if(casestudy.detailPageImageURL){
          galleryImages.push({
            _id: galleryImages.length.toString(),
            name: 'Casestudy Image',
            imageURL: casestudy.detailPageImageURL
          })
        }
        if(casestudy.content){

          _.forEach(casestudy.content, (item) => {
            // console.log('Here',  _.concat(galleryImages,item.mediaList))
            if(item.mediaList && item.mediaList.length >0){
              galleryImages = _.concat(galleryImages,item.mediaList)
            }
          })
        }
        newCasestudy["galleryImages"] = galleryImages
       
      res.status(200).json({
        data: newCasestudy
      })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})

// router.route('').get((req, res) => {
//   Casestudy.find()
//     .then(casestudies => {
     
//       res.status(200).json({
//         results: casestudies,
//         total: casestudies.length
//       })
//   })
//   .catch(err => res.status(400).json('Error: ' + err)); 
// })


router.route('/:id').delete((req, res) => {
  Casestudy.findByIdAndDelete(req.params.id)
    .then(casestudies => {
      res.status(200).json('Casestudy deleted!')
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})


router.route("/:id").post(function(req, res) {
  Casestudy.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json('Casestudy updated!')
      }
    }
  );
});

module.exports = router
