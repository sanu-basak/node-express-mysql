module.exports = app => {
    const tutorials = require('../controllers/tutorails.controller');
    var router = require('express').Router();
    //create new tutorial
    router.post('/',tutorials.create);
    app.use('/api/tutorials',router);
}