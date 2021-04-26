const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const logger = require('./logger');
const swaggerDocs = require('./app/swagger.json');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const data=require('./config/database')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
