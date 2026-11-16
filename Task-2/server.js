
const express = require("express");
const app = express();

const PORT = 3001;

// Set EJS as template engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Temporary storage
let students = [];

// Home route
app.get("/", (req, res) => {
    res.render("index");
});

// Form submission route
app.post("/submit", (req, res) => {

    // Get form data
    const name = (req.body.fullName || "").trim();
    const email = (req.body.email || "").trim();
    const phone = (req.body.phone || "").trim();
    const course = req.body.course;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const terms = req.body.terms;

    // Required field validation
    if (!name || !email || !phone || !course || !dob || !gender || !terms) {
        return res.status(400).send("All fields are required!");
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).send("Please enter a valid email!");
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).send("Enter a valid 10-digit phone number!");
    }

    // Course validation
    const allowedCourses = ["B.Tech", "BCA", "MCA"];

    if (!allowedCourses.includes(course)) {
        return res.status(400).send("Invalid course selected!");
    }

    // Gender validation
    const allowedGenders = ["Female", "Male", "Other"];

    if (!allowedGenders.includes(gender)) {
        return res.status(400).send("Invalid gender selected!");
    }

    // Terms validation
    if (terms !== "accepted") {
        return res.status(400).send("Please accept Terms and Conditions!");
    }

    // Date of Birth validation
    const birthDate = new Date(dob);

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(dob) ||
        Number.isNaN(birthDate.getTime()) ||
        birthDate.toISOString().slice(0, 10) !== dob ||
        birthDate > new Date()
    ) {
        return res.status(400).send("Please enter a valid date of birth!");
    }

    // Create student object
    const student = {
        name,
        email,
        phone,
        course,
        dob,
        gender
    };

    // Store validated data
    students.push(student);

    // Display data in terminal
    console.log("Registered Student:", student);
    console.log("All Students:", students);

    // Render success page
    res.render("success", {
        student: student,
        totalStudents: students.length
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
