// Array to store student records
let students = [];


// Function to add student
function addStudent() {

    // Get student details
    let rollNo = document.getElementById("rollNo").value;
    let studentName = document.getElementById("studentName").value;
    let className = document.getElementById("className").value;

    // Get marks
    let subject1 = Number(document.getElementById("subject1").value);
    let subject2 = Number(document.getElementById("subject2").value);
    let subject3 = Number(document.getElementById("subject3").value);


    // Validation
    if (
        rollNo === "" ||
        studentName === "" ||
        className === "" ||
        document.getElementById("subject1").value === "" ||
        document.getElementById("subject2").value === "" ||
        document.getElementById("subject3").value === ""
    ) {
        alert("Please enter all student details and marks.");
        return;
    }


    // Check marks range
    if (
        subject1 < 0 || subject1 > 100 ||
        subject2 < 0 || subject2 > 100 ||
        subject3 < 0 || subject3 > 100
    ) {
        alert("Marks should be between 0 and 100.");
        return;
    }


    // Calculate total
    let total = subject1 + subject2 + subject3;

    // Calculate percentage
    let percentage = (total / 300) * 100;


    // Create student object
    let student = {
        rollNo: rollNo,
        name: studentName,
        className: className,
        subject1: subject1,
        subject2: subject2,
        subject3: subject3,
        total: total,
        percentage: percentage
    };


    // Add student to array
    students.push(student);


    // Display student in table
    displayStudents();


    // Find and display topper
    findTopper();


    // Clear form
    clearForm();
}


// Function to display students
function displayStudents() {

    let tableBody = document.getElementById("tableBody");

    // Clear previous table data
    tableBody.innerHTML = "";


    // Add each student to table
    students.forEach(function(student) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.className}</td>
            <td>${student.subject1}</td>
            <td>${student.subject2}</td>
            <td>${student.subject3}</td>
            <td>${student.total}</td>
            <td>${student.percentage.toFixed(2)}%</td>
        `;

        tableBody.appendChild(row);
    });
}


// Function to find topper
function findTopper() {

    if (students.length === 0) {
        document.getElementById("topper").innerHTML =
            "No student record available.";
        return;
    }


    let topper = students[0];


    for (let i = 1; i < students.length; i++) {

        if (students[i].total > topper.total) {
            topper = students[i];
        }
    }


    document.getElementById("topper").innerHTML =
        `🏆 ${topper.name} - Roll No: ${topper.rollNo}
        <br>
        Total Marks: ${topper.total}/300
        <br>
        Percentage: ${topper.percentage.toFixed(2)}%`;
}


// Function to clear input fields
function clearForm() {

    document.getElementById("rollNo").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("className").value = "";

    document.getElementById("subject1").value = "";
    document.getElementById("subject2").value = "";
    document.getElementById("subject3").value = "";
}