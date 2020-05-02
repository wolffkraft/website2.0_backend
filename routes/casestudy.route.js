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
            id: galleryImages.length,
            name: 'Casestudy Preview Image',
            imageURL: casestudy.previewImageURL
          })
        }
        if(casestudy.detailPageImageURL){
          galleryImages.push({
            id: galleryImages.length,
            name: 'Casestudy Image',
            imageURL: casestudy.detailPageImageURL
          })
        }
        if(casestudy.content){
          _.forEach(casestudy.content, (item) => {
            if(item.mediaList){
              _.concat(galleryImages,item.mediaList)
            }
          })
        }
        newCasestudy["galleryImages"] = galleryImages
        console.log('casestudy.previewImageURL', newCasestudy["galleryImages"])
        return newCasestudy
      })
      // console.log('newCasestudies', newCasestudies)
      res.status(200).json({
      results: casestudies,
      total: casestudies.length
    })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('').post((req,res) => {
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

  const newCasestudy = new Casestudy({
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
    audio
  })
  newCasestudy.save()
   .then(() => res.json('Casestudy added!'))
   .catch(err => res.status(400).json('Error: '+ err))
})


module.exports = router
