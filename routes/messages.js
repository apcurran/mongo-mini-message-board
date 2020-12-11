"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");
const sanitizeHtml = require("sanitize-html");
const formatDate = require("../utility/format-date");

router.get("/", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find().toArray();
        
        res.render("index", { title: "Mongo Message", messages: messages });

    } catch (err) {
        console.error(err);
    }
});

// Topic routes
router.get("/gaming", async (req, res) => {
    try {
        res.send("gaming route");

    } catch (err) {
        console.error(err);
    }
});


router.get("/new-message", (req, res) => {
    res.render("new-message", { title: "New Message" });
});

router.post("/new-message", async (req, res) => {
    const { name, message } = req.body;
    const newMessage = {
        name: sanitizeHtml(name),
        message: sanitizeHtml(message),
        createdAt: formatDate(new Date())
    };

    try {
        await Connection.db.collection("messages").insertOne(newMessage);
        
        res.redirect("/");

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;