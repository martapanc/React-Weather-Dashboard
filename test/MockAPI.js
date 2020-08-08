const sampleResponse = require('./sample_response.json');
const express = require('express');
const app = express();

const port = 8082;

app.get('/', (rq, rs) => {
    rs.setHeader("Content-Type", "application/json");
    rs.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    rs.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return rs.end(JSON.stringify(sampleResponse));
});

app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}!`),
);
