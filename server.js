const express = require('express');
const path = require('path');
const req = require('express/lib/request');
const res = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

// HTML ROUTES 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/notes.html'))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});