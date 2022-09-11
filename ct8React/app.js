// recreating ct8 node / React enviromnment: wiki.mydevil.net/React
// no more hardcoded data - now readFile from db.json

const express = require('express');
const app = express();
app.use(express.json())  // do magic with "put", "post"

const fs = require('fs');
fs.readFile('./db.json', (err, data) => {
    toDoList = JSON.parse(data);
})

app.get('/api/', (req, res) => {
    res.json( toDoList );
    console.log("GET - " + new Date())
});

app.put('/api/:pars', (req, res) => {
    console.log(req.body);   // MUST app.use(express.json())  
});

app.post('/api/', (req, res) => {
    console.log(req.body);   // MUST app.use(express.json())  
});

app.listen(3000);
