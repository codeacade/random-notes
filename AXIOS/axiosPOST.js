// START SERVER FIRST WITH:
//
// npx json-server --watch ./src/db.json --port 4000

const axios = require('axios');

axios.post('http://localhost:4000/elements', {
        id: 346312,    // id MUST BE UNIQUE !!
        title: 'Bbbb',
        isDone: false
    }).then(resp => {
        console.log(resp.data);
    }).catch(error => {
        console.log(error);
    });
