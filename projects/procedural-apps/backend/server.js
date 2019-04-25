const cors = require('cors')
const express = require('express')  
const app = express()
app.set('case sensitive routing', true);
app.use(cors())

const port = 80

const FlatfileSolutionProvider = require("./projects/providers/FlatFileSolutionProvider")
const LocalStorageProvider = require("./projects/providers/LocalStorageProvider")

const SolutionsApi = require("./projects/api/SolutionsApi")
const StorageApi = require("./projects/api/StorageApi")

var _solutionProvider = new FlatfileSolutionProvider();
var _storageProvider = new LocalStorageProvider();

var _solutionsApi = new SolutionsApi(_solutionProvider);
var _storageApi = new StorageApi(_solutionProvider, _storageProvider);


app.get('/solutions/:alias([a-z0-9\-]+)', (req, res) => {
    _solutionsApi.get(req, res);
});

app.get('/solutions', (req, res) => {
    _solutionsApi.query(req, res);
});
app.get('/solutions/:alias/storage', (req, res) => {
    _storageApi.get(req, res);
});

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})