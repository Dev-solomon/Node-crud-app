 const mongoose = require('mongoose');

 const mongoString = "mongodb+srv://solomon:SolomonNtia7@crudapp.4txka.mongodb.net/test"

mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
  console.log(error);
})

mongoose.connection.on("open", function() {
  console.log("You are Connected to MongoDB database.");
})