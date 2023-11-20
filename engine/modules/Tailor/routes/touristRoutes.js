const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
const touristCtrller = require('../Controllers/touristController') 

var jsonParser = bodyParser.json();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.post('/create', jsonParser, touristCtrller.create);

router.get('/', touristCtrller.index);

module.exports = router