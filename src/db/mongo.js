const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'inputracker'

// Create a new MongoClient
const client = new MongoClient(url)


const get = function (data) {
  client.connect(function (err) {
    assert.equal(null, err)
    const db = client.db(dbName)
    const collection = db.collection('documents')
    collection.find(data)
    client.close();
  })

}

const put = function (data) {
  client.connect(client, () => {
    assert.equal(null, err)
    const db = client.db(dbName)
    const collection = db.collection('documents')
    collection.insertOne(data, function (err, result) {
      console.log('Inserting' + result)
      client.close()
    });
  
  })
}


module.exports = {
  'put': put,
  'get': get
}