var express = require('express');
var router = express.Router();
var controllers = require('../controllers/controllers.js');

const initWebRoutes = (app) => {
    router.use('/', controllers.checkURL); 
    router.get('/', controllers.getRoot);
    router.get('/process', controllers.getProcess);
    return app.use('/', router);
}

module.exports = initWebRoutes;