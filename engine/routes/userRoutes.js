const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
const userCtrller = require('../Controllers/UserController') 

var jsonParser = bodyParser.json();
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })


router.post('/postuser', jsonParser, userCtrller.createUser);

router.post("/login", userCtrller.login);

router.get('/home', userCtrller.index);

router.get('/', userCtrller.index);

module.exports = router