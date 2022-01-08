const mongoose = require("mongoose");
const Note = require("../models/Note.model");

const data = require("../data/notes.json");

require("../config/db.config");

mongoose.connection.once("connected", () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.log("Database cleared");
      return Note.insertMany(data)
    })
    .then((created) => console.log(`${created.length} have been created`))
    .catch((e) => console.error(e))
    .finally(() => {
      mongoose.connection
        .close()
        .then(() => console.log("Finish seeds.js"))
        .catch((e) => console.error(e))
        .finally(() => {
          process.exit(0);
        });
    });
});