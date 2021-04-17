module.exports=(app)=> {
    const greets =require('../controllers/greet.controller.js');
}

// Create a new greet
app.post('/greets',greets.create);

// Retrieve all Greets
app.get('/greets', greets.findAll);

// Retrieve a single Greet with greetId
app.get('/greets/:greetId', greets.findOne);

// Update a Greet with greetId
app.put('/greets/:greetId', greets.update);

// Delete a Greet with greetId
app.delete('/greets/:greetId', greets.delete);