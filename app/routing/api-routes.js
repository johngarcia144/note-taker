const fs = require('fs');
const DB_PATH = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
    app.post("/api/notes", function(req, res) {
        req.body.id = uuidv4();
        DB_PATH.push(req.body);
     
        fs.writeFile("./db/db.json", JSON.stringify(DB_PATH), function(err) {
            if (err) {
              return console.log(err);
            }
            console.log("Success!");
          });
        res.json(true);
    });
    app.get("/api/notes", function(req, res) {
 
        res.json(DB_PATH);
    });
    app.delete("/api/notes/:id", function(req, res) {
      // console.log(DB_PATH);
      for (let i = 0; i < DB_PATH.length; i++) {
        if (DB_PATH[i].id === req.params.id) {
            DB_PATH.splice(i, 1);
        }
      }
      fs.writeFile("./db/db.json", JSON.stringify(DB_PATH), function(err) {
        if (err) throw err;
        res.json(DB_PATH);
      });
    })
    
}