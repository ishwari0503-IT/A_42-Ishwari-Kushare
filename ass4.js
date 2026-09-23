
// Get the form
const form = document.getElementById("employeeForm");


// Form submit event
form.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Get values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value.trim();
    let department = document.getElementById("department").value;


    // Error elements
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let phoneError = document.getElementById("phoneError");
    let departmentError = document.getElementById("departmentError");
    let successMessage = document.getElementById("successMessage");


    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    phoneError.textContent = "";
    departmentError.textContent = "";
    successMessage.textContent = "";


    let valid = true;


    // Name validation
    if (name === "") {

        nameError.textContent = "Name is required.";
        valid = false;

    } else if (!/^[A-Za-z ]+$/.test(name)) {

        nameError.textContent =
            "Name should contain only letters.";
        valid = false;
    }


    // Email validation
    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent = "Email is required.";
        valid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Enter a valid email address.";
        valid = false;
    }


    // Password validation
    if (password === "") {

        passwordError.textContent =
            "Password is required.";
        valid = false;

    } else if (password.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";
        valid = false;
    }


    // Phone validation
    let phonePattern = /^[0-9]{10}$/;

    if (phone === "") {

        phoneError.textContent =
            "Phone number is required.";
        valid = false;

    } else if (!phonePattern.test(phone)) {

        phoneError.textContent =
            "Phone number must contain exactly 10 digits.";
        valid = false;
    }


    // Department validation
    if (department === "") {

        departmentError.textContent =
            "Please select a department.";
        valid = false;
    }


    // If all details are valid
    if (valid) {

        successMessage.textContent =
            "Employee registered successfully!";

        // Clear form
        form.reset();
    }

});

