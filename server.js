const express = require('express');
const app = express();
const port = 1337;

app.get('/', (req,res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});