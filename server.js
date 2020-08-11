"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
// DB Connection
const { Connection } = require("./db/db-init");
const expressLayouts = require("express-ejs-layouts");
const compression = require("compression");
const helmet = require("helmet");
// Import routes
const messagesRouter = require("./routes/messages");

// Middleware
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(compression());
app.use(helmet());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", messagesRouter);

// Init db
Connection
    .connectToMongo()
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Listening on port, ${PORT}.`));