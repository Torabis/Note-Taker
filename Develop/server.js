
//   Module dependencies.
 
const express = require('express');
const path = require('path');
var db = require('./db/db.json');
const fs = require('fs').promises;
const PORT = process.env.PORT || 3001;

// Create Express server.

const app = express();
const publicPath = path.resolve(__dirname, 'public');
// console.log(publicPath);
app.use(express.static(publicPath));

// Express configuration.

function getNextId(obj) {
    if(obj.length > 0)
    return obj.length + 1;
    else {
        return 1
    }
  }


app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
})