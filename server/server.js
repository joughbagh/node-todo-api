const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

 // GET /todos/123456
 app.get('/todos/:id', (req, res) => {
   var id = req.params.id;

   if (!ObjectID.isValid(id)) {
     res.status(404).send('Invalid ID');
     return console.log('Invalid ID');
   };

  Todo.findById(id).then((todo) => {
    if (todo) {
      res.send({todo});
    } else {
      res.status(404).send('No todo');
    }
  }).catch((e) => {
    res.status(400).send();
    console.log(e);
  });
 });

 // Remove route
 app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove('58ed8759c271ba78848ca519').then((doc) => {
    if (!doc) {
      return res.status(404).send();
    }

    res.send(doc);
  }).catch((e) => {
    res.status(400).send();
  });
 });

// Update route
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID is Invalid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send('No todo');
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
    console.log(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
