const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const apiRoutes = require('./api')
const UserRoutes = require('./userRoutes')
const Tourist = require('../modules/Tourist/routes/touristRoutes')
const createTable = require('../Database/createTable')



router.use('/api', apiRoutes);
router.use('/user', UserRoutes);
router.use('/create', createTable);

router.use('/tourist', Tourist)

module.exports = router