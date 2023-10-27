const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3001;
const database = './db/db.json'

const app = express();
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

// app.post('/api/notes', (req, res) => {
//     let note = JSON.parse(req.params.body);
//     fs.readFile(database, (err, data) => {
//         if(err){
//             console.log("could not read file");
//         }
//         else{
//             data.push(note);
//             fs.writeFile(database. data);
//             res.json("succesfully wrote added note");
//         }
//     })
    
// })


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})