// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var user = {name: 'Kevin', age: 31};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find().count().then((docsNum) => {
    console.log(`There are ${docsNum} results.`);
  }, (err) => {
    console.log('Unable to count docs', err);
  });

  // db.collection('Todos').find({
  //   _id: new ObjectID('58e809388c702d34200f9885')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)

  // db.collection('Users').insertOne({
  //   name: 'Kevin',
  //   age: 31,
  //   location: 'Miami, FL'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user.', err);
  //   };

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //db.close();
});