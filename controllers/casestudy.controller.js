const Casestudy = require("../models/casestudy.model.js");

// Create and Save a new Customer
// exports.create = (req, res) => {
  
// };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Casestudy.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving casestudy."
        });
      else res.send(data);
    });
  };

// Find a single Customer with a customerId
// exports.findOne = (req, res) => {
  
// };

// // Update a Customer identified by the customerId in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Customer with the specified customerId in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Customers from the database.
// exports.deleteAll = (req, res) => {
  
// };