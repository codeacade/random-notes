// recreating ct8 node / React enviromnment: wiki.mydevil.net/React
// lots of changes made, lots of errors fixed
// improved communication betweer front and back end
// All API writen after day of investingation
// GET (easy), PUT and POST with req.body and DELETE with req.params
// modals ID issue fixed
// database update/fetching fixed
// OPTIONAL - /api/:x URL to investigate further

const express = require('express');
const app = express();
app.use(express.json())  // do magic with "put", "post"
const fs = require('fs');


app.get('/api/', (req, res) => {

    fs.readFile('./db.json', (err, data) => {
        toDoList = JSON.parse(data);

        res.json( toDoList );
        console.log("GET - " + new Date())
    })
});


app.put('/api/:x', (req, res) => {
    putBody = req.body;    // MUST app.use(express.json()) 

    fs.readFile('./db.json', (err, data) => {
        toDoList = JSON.parse(data);

        putIndex = toDoList.elements.findIndex( obj => obj.id == putBody.id )

        if(putIndex>-1){
            toDoList.elements[putIndex] = putBody;
            fs.writeFile('./db.json', JSON.stringify(toDoList), console.error );
        }
    
        console.log("PUT - " + new Date())
    })
    res.status(204).send();  // React waits for that!
});


app.post('/api/', (req, res) => {
    postBody = req.body;   // MUST app.use(express.json())

    fs.readFile('./db.json', (err, data) => {
        toDoList = JSON.parse(data);

        if(postBody.id && postBody.title){
            newListObject = { id: postBody.id, title: postBody.title, isDone: postBody.isDone }
            toDoList.elements = [newListObject].concat(toDoList.elements);
            fs.writeFile('./db.json', JSON.stringify(toDoList), console.error );
        }
    
        console.log("POST - " + new Date())
    })
    res.status(204).send();  // React waits for that!
});


app.delete('/api/:id', (req, res) => {
    deleteId = req.params.id;    // MUST app.use(express.json()) 

    fs.readFile('./db.json', (err, data) => {
        toDoList = JSON.parse(data);
        deleteIndex = toDoList.elements.findIndex( obj => obj.id == deleteId )

        if(deleteIndex>-1) {
            filteredList = toDoList.elements.filter( obj => obj.id != deleteId);
            fs.writeFile('./db.json', 
                JSON.stringify({elements: filteredList}), 
                console.error 
            );
        }

        console.log("DELETE - " + new Date())
    })
    res.status(204).send();  // React waits for that!
});


app.listen(3000);
