const express = require('express')
const router = express.Router()
const Model = require('../models/model');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


  router.get('/home', (req, res) => {
    res.send('Api routed');
  });  


// middleware that is specific to this router
  router.post('/post', jsonParser, async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    var show = console.log("Test",JSON.stringify(req.body))
    
    try{
        const dataToSave =  data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({messaged: error.message})
    }
    

  })


  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  
// get all
  router.get('/getALL', async (req, res) => {
      try{
        const data = await Model.find();
        res.json(data)
      }

      catch(error){
        res.status(500).json({messaged: error.message})
      }

    res.send('Get All API')
  })


  // get by id
  router.get('/getOne/:id', async (req, res) => {
    try{
      const data = await Model.findById(req.params.id);
      res.json(data)
    }

    catch(error){
      res.status(500).json({messaged: error.message})
    }

  })



// update by id
  router.patch('/update/:id', async (req, res) => {
    try{
      const id = req.params.id
      const updateData = req.body;
      
      const options = {new: true}

      const result = await Model.findByIdAndUpdate(id, updateData, options) 

      res.send(result)
      
    }

    catch(error){
      res.status(500).json({messaged: error.message})
    }

  })


  // delete by id
  router.delete('/delete/:id', async (req, res) => {
    try{
      const id = req.params.id
      const data = await Model.findByIdAndDelete(req.params.id);
      res.json(`Documnet id: ${data.name} deleted`)
    }

    catch(error){
      res.status(400).json({messaged: error.message}) 
    }

  })




module.exports = router