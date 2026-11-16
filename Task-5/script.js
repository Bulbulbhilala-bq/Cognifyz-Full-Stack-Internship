const API_URL = "http://localhost:5000/api/students";
async function fetchStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const students = await response.json();

        displayStudents(students);

    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

function displayStudents(students) {
    const studentsList = document.getElementById("studentsList");

    studentsList.innerHTML = "";

    if (students.length === 0) {
        studentsList.textContent = "No students found.";
        return;
    }

    students.forEach((student) => {
        const card = document.createElement("div");
        card.className = "student-card";

        const heading = document.createElement("h3");
        heading.textContent = student.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + student.email;

        const course = document.createElement("p");
        course.textContent = "Course: " + student.course;

        card.appendChild(heading);
        card.appendChild(email);
        card.appendChild(course);
        // Edit button
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.className = "edit-btn";

editBtn.addEventListener("click", async () => {
    const newName = prompt("Enter new name:", student.name);
    if (newName === null) return;

    const newEmail = prompt("Enter new email:", student.email);
    if (newEmail === null) return;

    const newCourse = prompt("Enter new course:", student.course);
    if (newCourse === null) return;

    try {
        const response = await fetch(`${API_URL}/${student.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                email: newEmail,
                course: newCourse
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            fetchStudents();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error updating student:", error);
    }
});

card.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", async () => {
            const confirmDelete = confirm(
                "Are you sure you want to delete this student?"
            );

            if (!confirmDelete) return;

            try {
                const response = await fetch(
                    `${API_URL}/${student.id}`,
                    {
                        method: "DELETE"
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    fetchStudents();
                } else {
                    alert(result.message);
                }

            } catch (error) {
                console.error("Error deleting student:", error);
            }
        });

        card.appendChild(deleteBtn);

        studentsList.appendChild(card);
    });
}
// Add new student
const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Student added successfully!");
            studentForm.reset();
            fetchStudents();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error adding student:", error);
        alert("Unable to add student!");
    }
});

// Load students when page opens
fetchStudents();
// Load students when page opens
fetchStudents();