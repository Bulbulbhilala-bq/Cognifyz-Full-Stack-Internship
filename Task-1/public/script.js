
const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

   
    if (name === "") {
        alert("Please enter your full name!");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    form.submit();

});
