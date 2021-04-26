const { data } = require('../../Logger/logger');
const Greet = require('../services/services');
const {schema} = require('../Utility/helper');

class GreetingAp
{
   create = (Data, _callback) => {

    //  const data = {
    //   Name:req.body.Name,
    //   GreetingMessage:req.body.GreetingMessage
    // }
     
    if(!req.body.Name || !req.body.GreetingMessage){
      return res.send('Name And Greeting Message Should Not be Empty');
    }
    const result = schema.validate(req.body)

  //const isEmpty=false;
  
    if (result.error) {
    return res.send("Name should contain at least 3 chars and starts with caps");
  }
      Greet.create(Data, _callback,);
  };

  findAll = (Data,_callback) => {
  Greet.findAll(Data,_callback);
   };

  findOne = (Data,_callback) => {
  Greet.findOne(Data ,_callback);
  };

  updateOne = (Data,_callback) => {
  Greet.updateOne(Data ,_callback);
  };

  delete = (Data ,_callback) => {
  Greet.delete(Data ,_callback);
  };
}

module.exports = new GreetingAp();
