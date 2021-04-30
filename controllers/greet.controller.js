const {schema} = require('../Utility/helper');
const greetingService = require('../services/services');
const { error } = require('winston');
class GreetingApi {
    
     /**
     * @description  Create and Save a new Greeting Message
     */ 
       create = (req,res) => {
          
       if(!req.body.Name || !req.body.GreetingMessage) {
           return res.status(400).send({
               success: false,
               message: "Name And Greeting Message can not be empty"
           });
       }   
       const result = schema.validate(req.body);
       if(result.error){
           return res.send("Name should contain at least 3 chars and starts with caps")
       }

       const greetingDetails =  {
        Name:req.body.Name,
        GreetingMessage:req.body.GreetingMessage
      };
      
      greetingService.create(greetingDetails, (error ,greettingResult) =>{
          if(error)
          {
              res.status(400).send({
                  success: false,
                  message: error.message
              });
          }else {
             res.status(200).send({
                 success: true,
                 message: "Data Inserted Successfully",
                 data: greettingResult
             })
          }
      })

     };
   
     /**
     * @description Retrieve and return all Greeting Message from the database.
     */ 
       findAll = (req,res) => {
      greetingService.findAll((error, greettingResult)=>{
          if(error) {
              res.status(500).send({
                  success: false,
                  message: error.message || "Some Error are occured while retriving Greeting Message.!"
              });
          }else {
              res.status(200).send({
                  success: true,
                  message: "Greeting Message Has Been Retrived Successfully..!!",
                  data: greettingResult
              })
          }
      })
   };
   
   
   /**
    * @description Find a single Greeting Message with a greetId
    */ 
   
       findOne = (req,res) => {
      greetingService.findOne(req.params.greetId, (error, greettingResult)=>{
        if(greettingResult === null)
        {
            res.status(404).send({
                success: false,
                message: "Greeting Message Not Found By ID" + req.params.greetId
            });
        }else {
            res.status(200).send({
                success: true,
                message: "Greeting Message Retrived",
                data: greettingResult
            });
        }

      })
        
   };
   
   
   /**
    * @description  Update a Greeting Message identified by the greetId in the request
    */ 

      updateOne = (req,res) => {
        const greetdata ={
            Name:req.body.Name,
            GreetingMessage: req.body.GreetingMessage,
        };

       if(!req.body.GreetingMessage) {
           return res.status(400).send({
               success: false,
               message: "Greeting Message content can not be empty"
           });
       }
    
       greetingService.updateOne(req.params.greetId ,greetdata ,(error ,greettingResult)=>{
           if(greettingResult === null)
           {
               res.status(404).send({
                   success: false,
                   message: "Greeting Message Not Found With an ID" + req.params.greetId
               });
           }else {
               res.status(200).send({
                   success: true,
                   message: "Greeting Message Found And Updated",
                   data: greettingResult
               });
           }
       });
   };
   
   
     /**
     * @description Delete a Greeting Message with the specified noteId in the request
     */ 
   
       delete = (req,res) => {
           greetingService.delete(req.params.greetId , (error, greettingResult)=>{
               if(greettingResult === null) {
                    res.status(404).send({
                        success: false,
                        message: "Greeting Message Not Found With Id" + req.params.greetId
                    });
               }else {
                   res.status(200).send({
                       success: true,
                       message: "Greeting Message Deleted Successfull..!!"
                   });
               }
           })
        };
   }
   module.exports = new GreetingApi();
