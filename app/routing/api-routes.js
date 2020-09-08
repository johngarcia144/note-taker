const fs = require("fs")
const DB_PATH = "../db/db.json"
const db = require(DB_PATH) || []


module.exports = function(app) {

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;

    // Handle note validation
    if (!title || !text) {
        res.status(400).json({ message: "Please provide a title and a text" });
        return;
    }

    // Save note to database
    const newNote = { title, text }
    
    db.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(db))

    // End client request
    res.json(newNote)

})

app.delete("/api/notes/:id", (req, res) => {
    const noteIndex = parseInt(req.params.id);

    // Handle note ID validation
    if (noteIndex < 0 || noteIndex >= db.length) {
        res.status(400).json({ message: "Please provide an ID of an existing note" });
        return;
    }

    // Delete note from database
    db.splice(noteIndex, 1);

    fs.writeFileSync(DB_PATH, JSON.stringify(db))

    // End client request
    res.json({})

});

}
