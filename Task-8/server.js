
const express = require("express");
const { createClient } = require("redis");
require("dotenv").config();

const app = express();
const PORT = 5003;
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const redisClient = createClient({
    url: "redis://127.0.0.1:6379"
});

redisClient.on("error", (error) => {
    console.error("Redis Error:", error);
});

// Caching middleware
const cacheMiddleware = async (req, res, next) => {
    try {
        const cachedData = await redisClient.get("students");

        if (cachedData) {
            console.log("Data from Redis Cache");
            return res.json(JSON.parse(cachedData));
        }

        console.log("Cache Miss - Fetching New Data");
        next();
    } catch (error) {
        next(error);
    }
};

// Students API
app.get("/api/students", cacheMiddleware, async (req, res, next) => {
    try {
        const students = [
            { id: 1, name: "Rahul", course: "CSE" },
            { id: 2, name: "Priya", course: "IT" },
            { id: 3, name: "Aman", course: "CSE" }
        ];

        await redisClient.setEx(
            "students",
            60,
            JSON.stringify(students)
        );

        res.json(students);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(500).json({
        message: "Internal Server Error"
    });
});

// Start server after Redis connects
async function startServer() {
    try {
        await redisClient.connect();
        console.log("Redis Connected Successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server:", error.message);
    }
}

startServer();
