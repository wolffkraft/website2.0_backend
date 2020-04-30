const router = require('express').Router()
let Casestudy = require('../models/casestudy.model')

router.route('/').get((req, res) => {
  Casestudy.find()
    .then(casestudies => {
      res.status(200).json({
      results: casestudies
    })
  })
  .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('/add').post((req,res) => {
  const title = req.body.title;
  const domainType = req.body.domainType;
  const domainName = req.body.domainName;
  const imageURL = req.body.imageURL;
  const read_time = req.body.read_time;
  const subtitle = req.body.subtitle;
  const featured = req.body.featured;
  const tags = req.body.tags;
  const client = req.body.client;
  const project = req.body.project;
  const platform = req.body.platform;
  const content = req.body.content;

  const newCasestudy = new Casestudy({
    title,
    domainType,
    domainName,
    imageURL,
    read_time,
    subtitle,
    featured,
    tags,
    client,
    project,
    platform,
    content
  })
  newCasestudy.save()
   .then(() => res.json('Casestudy added!'))
   .catch(err => res.status(400).json('Error: '+ err))
})


module.exports = router




// module.exports = app => {
//     const casestudy = require("../controllers/casestudy.controller.js");
  
//     // Create a new casestudy
//     // app.post("/casestudy", customers.create);
  
//     // Retrieve all Customers
//     app.get("/casestudy", casestudy.findAll);
  
//     // // Retrieve a single Customer with customerId
//     // app.get("/casestudy/:customerId", customers.findOne);
  
//     // // Update a Customer with customerId
//     // app.put("/customers/:customerId", customers.update);
  
//     // // Delete a Customer with customerId
//     // app.delete("/customers/:customerId", customers.delete);
  
//     // // Create a new Customer
//     // app.delete("/customers", customers.deleteAll);
//   };