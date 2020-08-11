"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");

router.get("/", async (req, res) => {
    const messages = await Connection.db.collection("messages").find().toArray();
    console.log(messages);

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
        name,
        message,
        createdAt: formattedDate
    };

    await Connection.db.collection("messages").insertOne(newMessage);

    res.redirect("/");
});

module.exports = router;