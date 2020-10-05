//   Module dependencies.
const express = require("express");
const path = require("path");
var db = require("./db/db.json");
const fs = require("fs").promises;
const PORT = process.env.PORT || 3001;

// Create Express server.
const app = express();
const publicPath = path.resolve(__dirname, "public");
// console.log(publicPath);
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

// Express configuration.
function getNextId(obj) {
  if (obj.length > 0) return obj.length + 1;
  else {
    return 1;
  }
}

// Primary app routes.
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(publicPath, "notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.send(db);
});

// API routes.
app.post("/api/notes", (req, res) => {
  // console.log(req.body);
  const record = {
    title: req.body.title,
    text: req.body.text,
    id: getNextId(db),
  };
  db.push(record);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log("writing is Done!"); // Success
  });
  res.send(record);
});

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    const filtered = db.filter(item => {
        if (item.id != req.params.id)
        return item;
    });
    db = [...filtered];
    fs.writeFile("./db/db.json", JSON.stringify(filtered))
    .then(res.sendStatus(200));  
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
