const express = require('express');
const adminController = require('../controllers/admin.controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.get('/api/admin/stats', authentication, authorization.verifyRole, adminController.stats);

module.exports = router;