const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Email = require('./models/email');

const app = express();

mongoose.connect("mongodb+srv://admin:admin@cluster0-yu0ad.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
.then(()=> {
  console.log('Connection with database was stablished and it is running');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setting header to avoid CORS
app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
  next();
})

// Creating new email
app.post("/api/email", (req, res, next) => {
  const email = new Email({
    id: req.body.id,
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    content: req.body.content,
    archive: req.body.archive,
    enviada: req.body.enviada,
  });
  email.save();
  res.status(201).json({
    message: 'Email added sucessfully'
  });
});

// Retrieving all emails
app.get('/api/emails',(req, res) => {
    Email.find().then(documents => {
    res.status(200).json({
      message: 'Emails fetched successfully!',
      emails: documents
    });
  });
});


// Deleting Email from dataBase
app.delete('/api/emails/:id', (req, res) => {
    Email.deleteOne({_id: req.params.id}, console.log('###########: ' + req.params.id)).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Email deleted!'});
  });
});

app.get('/api/emails/:id', (req, res) => {
    res.status(200).json({
    message: 'Emails fetched successfully!',
    emails: documents
  });
});

// Updating
app.put('/api/emails/:id', (req, res) => {
    console.log(req.params._id);
    Email.updateOne({_id: req.params.id}, {$set: {archive: true}},console.log('MEDEIROS: ' + req.params.id))
        .then(result => {
    console.log(result);
    res.status(200).json({message: 'Email Archived!'});
  });
});

app.put('/api/email/:id', (req, res) => {
  console.log(req.params._id);
  Email.updateOne({_id: req.params.id}, {$set: {archive: false}},console.log('MEDEIROS: ' + req.params.id))
      .then(result => {
  console.log(result);
  res.status(200).json({message: 'Email Archived!'});
});
});

module.exports = app;
