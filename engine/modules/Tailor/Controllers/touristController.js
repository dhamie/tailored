const Model = require('../models/Location');

const mongoose= require('mongoose')
const db = mongoose.connection


exports.index = (req, res) => {
    res.send('Tourist routed');
}

exports.create = async (req, res) => {
    try {
            // Extract email and password from the req.body object
            const { location_name, plans, address, state, country, region, details } = req.body;
         
            // Check if user exists in database
            let locationExists = await Model.findOne({ location_name });
            if (locationExists) {
                  res.status(401).json({ message: "Location exists" });
                  return;
                }

            let newLocation = new Model({
                location_name,
                plans,
                address,
                state,
                country,
                region,
                details
            });       
              
            // Save location to database            
            db.db.collection('locationtable').insertOne(newLocation);
            console.log('added')
            res.send('added')
             
            
          } catch (error) {
              res.status(400).json({messaged: error.message})
          }
}



