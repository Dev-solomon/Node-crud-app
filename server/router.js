const express = require('express');
const res = require('express/lib/response');
const route = express.Router();
const controller = require('./controller');

route.get('/', controller.homeroute)

route.get('/add-user',function(req,res){
    console.log("adding a new user");
    res.render('add-user');
})
route.get('/update-user',  controller.update_user)





// process api
route.post('/api/add-user',controller.create);
route.get('/api/users',controller.find);
route.post('/api/update-user/:id',controller.update);
route.get('/api/delete-user/:id',controller.delete);


module.exports = route;