const Greet = require('../models/greet.model.js');
const {schema} = require('../Utility/helper');

class GreetingApi {
// Create and Save a new Greeting Message
    create = (req, res) => {
// Validate request
    if(!req.body.GreetingMessage) {
        return res.status(400).send({
            message: "Greeting Message  can not be empty"
        });
    }

    // Create a Greeting Message
    const greet = new Greet({
        Name: req.body.Name || "Untitled Greeting Message", 
        GreetingMessage: req.body.GreetingMessage
    });

    const result = schema.validate(req.body)
    //message: 'Name sholud contain 3 characters and Starts with Caps'
    if(result.error){
        return res.send("Name should contain at least 3 chars and starts with caps")
    
    }
    // Save Greeting Message in the database
    greet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Greeting Message."
        });
    });
};

// Retrieve and return all Greeting Message from the database.
    findAll = (req, res) => {
    Greet.find()
    .then(greets => {
        res.send(greets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Greeting Message."
        });
    });
};

// Find a single Greeting Message with a greetId
    findOne = (req, res) => {
    Greet.findById(req.params.greetId)
    .then(greet => {
        if(!greet) {
            return res.status(404).send({
                message: "Greeting Message not found with id " + req.params.greetId
            });            
        }
        res.send(greet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Greeting Message not found with id " + req.params.greetId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Greeting Message with id " + req.params.greetId
        });
    });
};

// Update a Greeting Message identified by the greetId in the request
    update = (req, res) => {
    // Validate Request
    if(!req.body.GreetingMessage) {
        return res.status(400).send({
            message: "Greeting Message content can not be empty"
        });
    }

    // Find Greeting Message and update it with the request body
    Greet.findByIdAndUpdate(req.params.greetId, {
        Name: req.body.Name || "Untitled Greeting Message",
        GreetingMessage: req.body.GreetingMessage
    }, {new: true})
    .then(greet => {
        if(!greet) {
            return res.status(404).send({
                message: "Greeting Message not found with id " + req.params.greetId
            });
        }
        res.send(greet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Greeting Message not found with id " + req.params.greetId
            });                
        }
        return res.status(500).send({
            message: "Error updating Greeting Message with id " + req.params.greetId
        });
    });
};

// Delete a Greeting Message with the specified noteId in the request
    delete = (req, res) => {
    Greet.findByIdAndRemove(req.params.greetId)
    .then(greet => {
        if(!greet) {
            return res.status(404).send({
                message: "Greeting Message not found with id " + req.params.greetId
            });
        }
        res.send({message: "Greeting Message deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Greeting Message not found with id " + req.params.greetId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Greeting Message with id " + req.params.greetId
        });
    });
};
}
module.exports = new GreetingApi();
