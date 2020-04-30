const router = require('express').Router()
let Casestudy = require('../models/casestudy.model')

router.route('').get((req, res) => {
  Casestudy.find()
    .then(casestudies => {
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
