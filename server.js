const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;

// path to db files to put saved notes
const userNotes = require('./Develop/db/db.json');
const req = require('express/lib/request');
const res = require('express/lib/response');



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));

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