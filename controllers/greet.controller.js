const { data } = require('../../Logger/logger');
const Greet = require('../services/services');
const {schema} = require('../Utility/helper');

class GreetingAp
{
   create = (req, _callback) => {
     
    if(!req.body.Name || !req.body.GreetingMessage){
      return res.send('Name And Greeting Message Should Not be Empty');
    }
    const result = schema.validate(req.body)

  //const isEmpty=false;
  
    if (result.error) {
    return res.send("Name should contain at least 3 chars and starts with caps");
  }
      Greet.create(req, _callback,);
  };

  findAll = (greet,_callback) => {
  Greet.findAll(greet,_callback);
   };

  findOne = (greet,_callback) => {
  Greet.findOne(greet ,_callback);
  };

  updateOne = (greet,_callback) => {
  Greet.updateOne(greet ,_callback);
  };

  delete = (greet ,_callback) => {
  Greet.delete(greet ,_callback);
  };
}

module.exports = new GreetingAp();
