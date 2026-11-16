function navigateTo(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach((page) => {
        page.hidden = true;
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.hidden = false;
    }
}
document.querySelectorAll("nav a").forEach((link) => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageId = this.getAttribute("href").substring(1);
        navigateTo(pageId);
    });
});
navigateTo("home");
const passwordInput = document.getElementById("password");
const passwordStrength = document.getElementById("passwordStrength");
passwordInput.addEventListener("input", function() {
    const password = passwordInput.value;
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    let score = 0;

    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    if (password.length === 0) {
        passwordStrength.textContent = "";
    }
    else if (score <= 2) {
        passwordStrength.textContent = "Weak Password";
    }
    else if (score <= 4) {
        passwordStrength.textContent = "Medium Password";
    }
    else {
        passwordStrength.textContent = "Strong Password";
    }

});
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const terms = document.getElementById("terms").checked;


    // Error elements
    const nameError = document.getElementById("nameError");

    const emailError = document.getElementById("emailError");

    const passwordError = document.getElementById("passwordError");

    const confirmPasswordError = document.getElementById("confirmPasswordError");

    const termsError = document.getElementById("termsError");

    const successMessage = document.getElementById("successMessage");
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;


    // Name validation
    if (name.length < 3) {

        nameError.textContent = "Name must contain at least 3 characters.";

        isValid = false;

    }


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!strongPassword.test(password)) {
        passwordError.textContent = "Password does not meet all requirements.";
        isValid = false;
    }
    // Confirm password validation
    if (password !== confirmPassword) {

        confirmPasswordError.textContent = "Passwords do not match.";

        isValid = false;

    }
    if (!terms) {

        termsError.textContent = "Please accept the terms.";

        isValid = false;

    }


    // Stop if validation fails
    if (!isValid) {
        return;
    }
    successMessage.textContent = "Registration successful!";

    // Create student card
    const studentCard = document.createElement("div");

    studentCard.classList.add("student-card");

    // Create student name
    const studentName = document.createElement("h3");

    studentName.textContent = name;

    // Create student email
    const studentEmail = document.createElement("p");

    studentEmail.textContent = email;

    // Add elements to card
    studentCard.appendChild(studentName);

    studentCard.appendChild(studentEmail);


    // Get student list
    const studentList = document.getElementById("studentList");

    // Remove default message
    if (studentList.querySelector("p")?.textContent === "No students registered yet.") {

        studentList.innerHTML = "";

    }

    // Add new student card
    studentList.appendChild(studentCard);


    // Reset form
    registrationForm.reset();

    passwordStrength.textContent = "";

});
