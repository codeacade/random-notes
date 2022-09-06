// START SERVER FIRST WITH:
//
// npx json-server --watch ./src/db.json --port 4000

const axios = require('axios');

axios.get('http://localhost:4000/elements')
    .then(resp => {
        data = resp.data;
        data.forEach(e => {
            console.log(`${e.id}, ${e.title}, ${e.isDone}`);
        });
    })
    .catch(error => {
        console.log(error);
    });
