const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const PORT = process.env.port || 3001;

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if(err){
            console.log("could not read file");
        }
        else{
            res.json(JSON.parse(data));
        }
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post('/api/notes', (req, res) => {
    let {title, text} = req.body;
    let note = {
        id: uuidv4(),
        title,
        text
    };
    console.log(note);
    fs.readFile("./db/db.json", (err, data) => {
        if(err){
            console.log("could not read file");
        }
        else{
            let tempNote = JSON.parse(data);
            tempNote.push(note);
            fs.writeFile("./db/db.json", JSON.stringify(tempNote, null, 2), (err)=> {
                if(err){
                    console.log("error occured");
                }
                else{
                    res.json("succesfully wrote added note");
                }
            });
            
        }
    })
    
})

app.delete('/api/notes/:id', (req,res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if(err){
            console.log("could not read file");
        }
        else{
            let tempNote = JSON.parse(data);
            tempNote.splice(tempNote.indexOf(req.params.id),1);
            fs.writeFile("./db/db.json", JSON.stringify(tempNote, null, 2), (err) => {
                if(err){
                    console.log("error occured");
                }
                else{
                    res.json("successfully delete note");
                }
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})