// recreating ct8 node / React enviromnment: wiki.mydevil.net/React
// no more hardcoded data - now readFile from db.json

const express = require('express');
const app = express();
const fs = require('fs');

fs.readFile('./db.json', (err, data) => {
    toDoList = JSON.parse(data);
})

app.get('/api', (req, res) => {
    res.json( toDoList );
});

app.listen(3000);
