const form = document.querySelector("form");

form.addEventListener("submit", function(event){
 const name = document.querySelector('[name="fullName"]').value.trim();
    const email = document.querySelector('[name="email"]').value.trim();
    const phone = document.querySelector('[name="phone"]').value.trim();
    const course = document.querySelector('[name="course"]').value;
    const dob = document.querySelector('[name="dob"]').value;
    const gender = document.querySelector('[name="gender"]:checked');
    const terms = document.querySelector('[name="terms"]').checked;

    if (!name || !email || !phone || !course || !dob || !gender || !terms) {
        event.preventDefault();
        alert("Please fill all fields and accept Terms & Conditions!");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        event.preventDefault();
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

});