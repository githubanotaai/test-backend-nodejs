const routerArtigo = require("express").Router();
const artigo = require("../models/artigo");

routerArtigo.get("/", (req, res) => {
    artigo.find()
        .then(data => { res.status(200).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});

routerArtigo.post("/", (req, res) => {
    const { title, text } = req.body;
    
    artigo.create({ title, text })
        .then(data => { res.status(201).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});

routerArtigo.put("/:id", (req, res) => {
    const { title, text } = req.body;
    
    artigo.findOneAndUpdate({ _id: req.params.id }, { title, text })
        .then(data => { res.status(200).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});

routerArtigo.delete("/:id", (req, res) => {
    artigo.findByIdAndDelete({ _id: req.params.id })
        .then(data => { res.status(200).send({ success: true }); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});


module.exports = routerArtigo;