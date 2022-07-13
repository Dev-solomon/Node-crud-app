const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectdb = require('./server/database');
 
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
//log requests
app.use(morgan('tiny'));
//set engine name
app.set("view engine", "ejs")
//json parser
app.use(express.json())

//use body parser
app.use(bodyparser.urlencoded({extended:true}))

//use static files
app.use(express.static(path.resolve(__dirname, 'assets')));
app.use('/css', express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.resolve(__dirname, 'node_modules/jquery/dist')));
 


app.use('/',  require('./server/router'))

app.listen(PORT, () => console.log("listening on port available",PORT));