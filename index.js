const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const connectDB = require("./config/db.js");
const router = require('./routes');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Add root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Ecommerce API' });
});

app.use("/api", router);

// Connect to MongoDB
connectDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("Server is running at : ", PORT);
    });
}

// Export for Vercel
module.exports = app;