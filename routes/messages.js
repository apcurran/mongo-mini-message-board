"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");

router.get("/", async (req, res) => {
    // const pizza = await Connection.db.collection("pizzas").find().toArray();
    // console.log(pizza);

    res.send("main messages page");
});

router.get("/new-message", (req, res) => {
    res.render("form", { title: "New Message" });
});

router.post("/new-message", async (req, res) => {
    const { name, message } = req.body;

    console.log(name, message);
    res.end();
});

module.exports = router;