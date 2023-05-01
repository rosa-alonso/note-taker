const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.post("/api/notes", (req, res) => {
  // console.log(req.body);
  let everyNote = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );
  everyNote.push(req.body);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(everyNote)
  );
  res.json(JSON.parse(everyNote));
});
app.get("/api/notes", (req, res) => {
  let everyNote = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );
  res.json(everyNote);
});
app.listen(PORT, () => {
  console.log("app is running on http://localhost:" + PORT);
});
