
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Students data
let students = [
    {
        id: 1,
        name: "Rahul",
        email: "rahul@gmail.com",
        course: "B.Tech CSE"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@gmail.com",
        course: "BCA"
    }
];

// GET - Fetch all students
app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});

// POST - Add new student
app.post("/api/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "All fields are required!"
        });
    }

    const newStudent = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        course: course.trim()
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully!",
        student: newStudent
    });
});

// PUT - Update student
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found!"
        });
    }

    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "All fields are required!"
        });
    }

    student.name = name.trim();
    student.email = email.trim();
    student.course = course.trim();

    res.json({
        message: "Student updated successfully!",
        student: student
    });
});

// DELETE - Delete student
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
        (s) => s.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found!"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully!",
        student: deletedStudent[0]
    });
});

// Home route
app.get("/", (req, res) => {
    res.send("Student Management API is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Add new student
const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    console.log("Sending student data:", studentData);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        console.log("Server response:", result);

        if (response.ok) {
            alert(result.message);
            studentForm.reset();
            fetchStudents();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error adding student:", error);
    }
});

// Load students
fetchStudents();
