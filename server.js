const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');


const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const data=require('./config/database')(app);

// define a simple route
app.get('/',(req,res)=>{
    res.json({"message":"Greeting is an act of communication in which human beings intentionally make their presence known to each other, to show attention to."});
});

require('./app/routes/greet.routes.js')(app);
require("dotenv").config();
let port=process.env.PORT;
let host = process.env.HOST;

// listen for requests
app.listen(port, host, () => {
    logger.log('info',`Server is listening ${host}:${port}`);
});
