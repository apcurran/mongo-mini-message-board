"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");
// const sanitize = require("sanitize")();
const sanitizeHtml = require("sanitize-html");

router.get("/", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find().toArray();
        
        res.render("index", { title: "Mongo Message", messages: messages });

    } catch (err) {
        console.error(err);
    }
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
        name: sanitizeHtml(name),
        message: sanitizeHtml(message),
        createdAt: formattedDate
    };

    try {
        await Connection.db.collection("messages").insertOne(newMessage);
        
        res.redirect("/");

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;