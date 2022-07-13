var Userdb = require('./model');
const axios = require('axios');
//creating a new user
exports.create = (req,res)=>{


    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    const user = new Userdb({
        name :  req.body.username,
        email : req.body.email,
        gender: req.body.gender
    });

    user
        .save(user)
        .then(data => {
            //res.send(data)
            console.log("New User Created Successful");
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send("CHECK YOUR DATA AND VALIDATE IT PLEASE");
        });

}

//reading from the database
exports.homeroute = (req, res) => {
    // Make a get request to /api/users
    axios.get('https://mycrud-application.herokuapp.com//api/users')
        .then(function(response){
            console.log("success");
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

//updating a former user
exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        console.log("Content can not be emtpy!");
        return;
    }
      
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                console.log("success again");
                // res.send(data);
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })

}

exports.update_user = (req, res) =>{
    axios.get('https://mycrud-application.herokuapp.com//api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update-user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

//deleting a user
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
               console.log("Deleted User Successfully");
               res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}