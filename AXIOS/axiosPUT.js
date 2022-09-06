// START SERVER FIRST WITH:
//
// npx json-server --watch ./src/db.json --port 4000

const axios = require('axios');

axios.put('http://localhost:4000/elements/223366/', { // id(223366) MUST MATCH EXISTING ONE
        id: 223366,     
        title: 'Abcde',
        isDone: false
    }).then(resp => {
        console.log(resp.data);
    }).catch(error => {
        console.log(error);
    });
