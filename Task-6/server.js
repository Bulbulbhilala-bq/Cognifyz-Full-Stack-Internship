
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

// Protected Student Routes
app.use("/api/students", studentRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Cognifyz Task 6 Server is Running!");
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT || 5001, () => {
            console.log(
                `Server running on port ${process.env.PORT || 5001}`
            );
        });

    } catch (error) {
        console.error("Server start failed:", error.message);
    }
};

startServer();
