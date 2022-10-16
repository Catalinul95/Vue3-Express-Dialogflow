const express = require('express');
const EndPointsController= require('../controllers/EndPointsController');

const endPointsController = new EndPointsController();

const router = express.Router();

router.post('/clientEndPoint', endPointsController.clientEndPoint.bind(endPointsController));
router.post('/webHookEndPoint', endPointsController.webHookEndPoint.bind(endPointsController));

module.exports = router;