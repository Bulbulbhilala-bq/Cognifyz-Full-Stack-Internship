
const API_URL = "http://localhost:5001/api";

// REGISTER USER
async function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    const message = document.getElementById("message");

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        message.textContent = data.message;

        if (response.ok) {
            document.getElementById("registerName").value = "";
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPassword").value = "";
        }

    } catch (error) {
        message.textContent = "Registration failed. Server error.";
    }
}


// LOGIN USER
async function loginUser() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("message");

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            return;
        }

        // Save JWT token
        localStorage.setItem("token", data.token);

        message.textContent = "Login successful!";

        document.getElementById("registerSection").hidden = true;
        document.getElementById("loginSection").hidden = true;
        document.getElementById("dashboardSection").hidden = false;

    } catch (error) {
        message.textContent = "Login failed. Server error.";
    }
}


// FETCH STUDENTS
async function fetchStudents() {
    const token = localStorage.getItem("token");

    const studentList = document.getElementById("studentList");

    try {
        const response = await fetch(`${API_URL}/students`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const students = await response.json();

        if (!response.ok) {
            studentList.textContent = students.message;
            return;
        }

        studentList.innerHTML = "";

        if (students.length === 0) {
            studentList.textContent = "No students found.";
            return;
        }

        students.forEach((student) => {
            const card = document.createElement("div");
            card.className = "student-card";

            const name = document.createElement("h3");
            name.textContent = student.fullName;

            const email = document.createElement("p");
            email.textContent = `Email: ${student.email}`;

            const course = document.createElement("p");
            course.textContent = `Course: ${student.course}`;

            card.appendChild(name);
            card.appendChild(email);
            card.appendChild(course);

            studentList.appendChild(card);
        });

    } catch (error) {
        studentList.textContent = "Unable to fetch students.";
    }
}


// LOGOUT USER
function logoutUser() {
    localStorage.removeItem("token");

    document.getElementById("registerSection").hidden = false;
    document.getElementById("loginSection").hidden = false;
    document.getElementById("dashboardSection").hidden = true;

    document.getElementById("studentList").innerHTML = "";

    document.getElementById("message").textContent = "Logged out successfully.";
}
