const express = require('express')
const router = express.Router()
const userModel = require('../models/user');
const locationModel = require('../models/user');

const essMeth = require('../Methods/essMeth')
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const models = {
    "user" : {
        modelName: userModel,
        schemaName: 'UserTable'
    },
    "location" : {
        modelName: locationModel,
        schemaName: 'LocationTable'
    },
}


var jsonParser = bodyParser.json();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', (req, res) => {
    res.send('create table');
});

router.post('/:model', jsonParser, async (req, res,) => {
    let model = req.params.model;
    try{
      essMeth.createDB(models[model].modelName, models[model].schemaName)
      res.send('check console ' + locationModel)
    }
    catch (err){
      console.log(err);
    } 
});





module.exports = router