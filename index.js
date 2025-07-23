const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const connectDB = require("./config/db.js");
const router = require('./routes');

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use("/api", router);

// Avoid calling app.listen() on Vercel
let isConnected = false;

async function handler(req, res) {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
        console.log("DB connected");
    }

    app(req, res);
}

module.exports = handler;
