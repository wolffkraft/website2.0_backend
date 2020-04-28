module.exports = app => {
    const casestudy = require("../controllers/casestudy.controller.js");
  
    // Create a new casestudy
    // app.post("/casestudy", customers.create);
  
    // Retrieve all Customers
    app.get("/casestudy", casestudy.findAll);
  
    // // Retrieve a single Customer with customerId
    // app.get("/casestudy/:customerId", customers.findOne);
  
    // // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
  
    // // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);
  
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };