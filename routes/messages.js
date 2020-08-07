"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");

router.get("/", async (req, res) => {
    // const pizza = await Connection.db.collection("pizzas").find().toArray();
    // console.log(pizza);

    res.send("main messages page");
});

module.exports = router;