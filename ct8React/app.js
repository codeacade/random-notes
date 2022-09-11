// recreating ct8 node / React enviromnment: wiki.mydevil.net/React

const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({
    "elements": [
        {
            "id": 223344,
            "title": "Buy nuts and crisps!",
            "isDone": true
        },
        {
            "id": 223313,
            "title": "Charge tablet",
            "isDone": false
        },
        {
            "id": 171738,
            "title": "Check hosting",
            "isDone": false
        },
        {
            "id": 36948,
            "title": "Eat crisps!",
            "isDone": true
        }
        ]

    });
});

app.listen(3000);
