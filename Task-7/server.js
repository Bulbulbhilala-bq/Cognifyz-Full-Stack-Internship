
const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3,
    message: {
        message: "Too many requests. Please try again later."
    }
});

app.use("/api", limiter);

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Cognifyz Task-7 server is running!"
    });
});

// External API Integration
app.get("/api/posts", async (req, res) => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );

        res.json(response.data.slice(0, 10));

    } catch (error) {
        console.error("External API Error:", error.message);

        if (error.response) {
            return res.status(error.response.status).json({
                message: "External API returned an error"
            });
        }

        if (error.request) {
            return res.status(503).json({
                message: "External API is not responding"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Start Server
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
