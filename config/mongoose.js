// LIB
const mongoose = require('mongoose');
// Connection
mongoose.connect('mongodb://localhost/contacts_list_db');
// Accuire the connection to check
const db=mongoose.connection;
// If error
db.on('error',console.error.bind(console,'error connecting to DB'));
// if open
db.once('open', function(){
    console.log('Successfully connected to DB');
});