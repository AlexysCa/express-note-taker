const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const req = require('express/lib/request');
const res = require('express/lib/response');
const { json } = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

// HTML ROUTES 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'./Develop/public/notes.html'))
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'./Develop/public/index.html'))
})

// API ROUTES
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/db/db.json'))
})

app.post('api/notes', (req, res) => {
    let saveNote = {
        id: uuidv4(),
        title:req.body.title,
        text:req.body.text
    };
    let savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './Develop/db/db.json'), 'utf-8'))
    savedNotes.push(saveNote)
    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(savedNotes))
    res.json(savedNotes)
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});