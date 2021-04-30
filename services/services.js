const greetingModel = require('../models/greet');

class GreetingAp
{
   create = (greetingData, callback) => {
      greetingModel.create(greetingData, (error ,greetingResult)=>{
          if(error){
            callback(error ,null)
          }else {
            callback(null ,greetingResult);
          }

      });
  };

  findAll = (callback) => {
      greetingModel.findAll((error ,greetingResult)=>{
          if(error){
            callback(error ,null);
          }else {
            callback(null ,greetingResult);
          }
     });

   };

  findOne = (greetingID,callback) => {
    greetingModel.findOne(greetingID ,(error ,greetingResult)=>{
        if(error){
          callback(error ,null);
        }else {
          callback(null ,greetingResult);
        }
    });
  };

  updateOne = (greetingID ,greetdata ,callback) => {
    greetingModel.updateOne(greetingID ,greetdata ,(error ,greetingResult)=>{
        if(error){
          callback(error ,null);
        }else {
          callback(null ,greetingResult);
        }
    });
  };

  delete = (greetingID ,callback) => {
    greetingModel.delete(greetingID ,(error ,greetingResult)=>{
        if(error){
          callback(error ,null);
        }else {
          callback(null ,greetingResult);
        }
    });
  };
}

module.exports = new GreetingAp();
