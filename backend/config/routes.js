const router = require("express").Router();
const Note = require("../models/Note.model");

router.get("/", async (req, res, next) => {
    res.send( {hola: "Mundo"} )
});

router.get("/notes", async (req, res, next) => {
    const notes = await Note.find().exec();
    res.send(notes);
})

router.get("/notes/:id", async (req, res, next) => {
    const id = req.params.id
    const note = await Note.findById(id).exec();
    console.log("get",id)
    res.send(note);
})

router.patch("/notes/:id", async (req, res, next) => {
    const id = req.params.id
    const note =  await Note.findByIdAndUpdate(id, req.body).exec();
    res.send(note);
})

router.post("/notes", async (req, res, next) => {
    const note = await Note.create(req.body);
    res.send(note);
})

router.delete("/notes/:id", async (req, res, next) => {
    const id = req.params.id
    const response = await Note.findByIdAndDelete(id)
    res.send(response);
})



module.exports = router;