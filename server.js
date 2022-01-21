const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// path to db files to put saved notes
const userNotes = require('./Develop/db/db.json');
const req = require('express/lib/request');
const res = require('express/lib/response');



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname + '/Develop/public'));

app.get('/api/notes', (req, res) => {
    res.json(userNotes.slice(1));
})

// HTML ROUTES 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'./Develop/public/notes.html'))
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./Develop/public/index.html'))
})

function userNewNote(body, notesList) {
    const noteInput = body;
    if (!Array.isArray(notesList))
    notesList = [];

    if (notesList.length === 0)
    notesList.push(0);

    body.id = notesList[0];
    notesList[0]++;

    notesList.push(noteInput);
    fs.writeFileSync(path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notesList, null, 2)
        );
    return noteInput;
}

app.post('/api/notes', (req, res) => {
    const noteInput = userNewNote(req.body, userNotes);
    res.json(noteInput);
})



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});