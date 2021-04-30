const mongoose = require('mongoose');
const { error } = require('winston');

const GreetSchema = mongoose.Schema({
  Name: String,
  GreetingMessage: String
}, {
  timestamps: true
});

const greetingmodel = mongoose.model('Greet', GreetSchema);

class GreetingModel {

  create = (greetingData , callback) => {
    const greet = new greetingmodel(greetingData);
    greet.save((error ,greetingResult)=>{
        if(error){
          callback(error, null);
        }else {
          callback(null ,greetingResult);
        }
    });
 };

  findAll = (callback)=>{
    greetingmodel.find((error ,greetingData)=>{
        if(error){
          callback(error ,null);
        }else {
          callback(null ,greetingData);
        }
    });
  };

  findOne = (greetingId ,callback)=>{
      greetingmodel.findById(greetingId ,(error ,greetingResult)=>{
          if(error){
            callback(error ,null);
          }else {
            callback(null ,greetingResult);
          }
      });
  };

  updateOne(messageID ,updated ,callback) {
      greetingmodel.findByIdAndUpdate(messageID ,updated , {new: true}, (error,greetingResult)=>{
          if (error){
            callback(error ,null);
          }else {
            callback(null ,greetingResult);
          }
      });
  };

  delete = (greetingData ,callback) =>{
      greetingmodel.findByIdAndDelete(greetingData ,(error,greetingResult)=>{
          if(error){
            callback(error ,null);
          }else {
            callback(null ,greetingResult);
          }
      });
  };

}
module.exports = new GreetingModel;
