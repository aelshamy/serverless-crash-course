const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.DB, function (err, client) {
  if (err) {
    console.log(err)
    return
  }
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// mongoose.connect(process.env.DB)
// .catch(err => console.log("unable to connect to database"))