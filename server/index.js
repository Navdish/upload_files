const express = require('express');
const multer = require('multer');
const cors = require('cors');
const photos = require('./Schema')
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended : true}));

app.use('/uploads', express.static('uploads'));
// app.use(express.json);
const upload = multer({
    storage: multer.diskStorage({
        destination : function(req, file, cb)
        {
            cb(null, "uploads")
        },
        filename : function(req, file, cb)
        {
            cb(null,  Date.now() + "-" + file.originalname)
        }
    })
}).array("user_file");

mongoose.connect("mongodb+srv://navdishjaggi:navdishjaggi@cluster0.rrvfwvs.mongodb.net/")
    .then(console.log("db connected"))
    .catch((error) => console.log(error));

app.post('/files', upload,async function(req, res) {
    console.log("inside backend route post")

    let entry = [];
    for(file of req.files){
        entry = [...entry, file.path];
    }
    console.log(entry);
    const username = req.body.username;

    const response = await photos.create({username : username, photo : entry});
})



app.get('/files', async function(req, res) {
    console.log("inside backend route get")
    const response = await photos.findOne();
    console.log(response);
    res.status(200).json(response);
})

app.listen('8080',function(){
    console.log("server ruunning on 8080");
})