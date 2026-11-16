
const express = require("express");
const app = express();

const PORT = 3000;


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


let students = [];
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const name = (req.body.fullName || "").trim();
    const email = (req.body.email || "").trim();

    if (!name || !email) {
        return res.status(400).send("Name and Email are required!");
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).send("Please enter a valid email address!");
    }

  
    console.log("Student Name:", name);
    console.log("Student Email:", email);

    students.push({
        name: name,
        email: email
    });

    console.log("All Students:", students);

    res.render("success", {
        name: name,
        email: email,
        totalStudents: students.length
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
