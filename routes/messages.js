"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");
const sanitize = require("sanitize")();

router.get("/", async (req, res) => {
    const messages = await Connection.db.collection("messages").find().toArray();

    res.render("index", { title: "Mongo Message", messages: messages });
});

router.get("/new-message", (req, res) => {
    res.render("new-message", { title: "New Message" });
});

router.post("/new-message", async (req, res) => {
    const { name, message } = req.body;

    const date = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    const newMessage = {
        name: sanitize.value(name, String),
        message: sanitize.value(message, String),
        createdAt: formattedDate
    };

    await Connection.db.collection("messages").insertOne(newMessage);

    res.redirect("/");
});

module.exports = router;