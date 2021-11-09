// Linking the noteContents in db to this routes.
var noteContents = require("../db/notes")

//Create promise-based versions of functions using callbacks
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// Create a route
module.exports = function(app) {

    //Display all notes
    app.get("/api/notes", function(req, res) {
        res.json(noteContents);
    });

    //Create new posts
    app.post("/api/notes", function(req, res) {

        let newNote = req.body;

        // check to find last id in our notes json file, and assign the note to one greater than that id
        let lastId = noteContents[noteContents.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;
        
        console.log("Req.body:", req.body);
        noteContents.push(newNote);

        // write to the noteContents.json
        writeFileAsync("./db/notes.json", JSON.stringify(noteContents)).then(function() {
            console.log("noteContents.json has been updated!");
        });

        res.json(newNote);
    });

    // Delete a post
    app.delete("/api/notes/:id", function(req, res) {        

        console.log("Req.params:", req.params);
        let chosenId = parseInt(req.params.id);
        console.log(chosenId);


        for (let i = 0; i < noteContents.length; i++) {
            if (chosenId === noteContents[i].id) {
                // delete noteContents[i];
                noteContents.splice(i,1);
                
                let noteJSON = JSON.stringify(noteContents, null, 2);

                writeFileAsync("./db/notes.json", noteJSON).then(function() {
                console.log ("Chosen note has been deleted!");
            });                 
            }
        }
        res.json(noteContents);
    });
        
};
