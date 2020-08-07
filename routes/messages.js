"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");

router.get("/", async (req, res) => {
    // const pizza = await Connection.db.collection("pizzas").find().toArray();
    // console.log(pizza);

    res.render("index", { title: "Mongo Message" });
});

router.get("/new-message", (req, res) => {
    res.render("new-message", { title: "New Message" });
});

router.post("/new-message", async (req, res) => {
    const { name, message } = req.body;

    console.log(name, message);
    res.end();
});

module.exports = router;