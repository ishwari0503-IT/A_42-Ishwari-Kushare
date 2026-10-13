const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// 1. CONNECT TO MONGODB
// Replace the connection string with your own MongoDB URI if using MongoDB Atlas
mongoose.connect('mongodb://localhost:27017/studentdb')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// 2. DEFINE THE STUDENT SCHEMA & MODEL
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true }
});

const Student = mongoose.model('Student', studentSchema);

// 3. CRUD ENDPOINTS

// CREATE: Add a new student record
app.post('/api/students', async (codeReq, codeRes) => {
    try {
        let student = new Student({
            name: codeReq.body.name,
            age: codeReq.body.age,
            course: codeReq.body.course,
            rollNumber: codeReq.body.rollNumber
        });
        student = await student.save();
        codeRes.status(201).send(student);
    } catch (error) {
        codeRes.status(400).send({ message: error.message });
    }
});

// READ ALL: Get a list of all students
app.get('/api/students', async (codeReq, codeRes) => {
    try {
        const students = await Student.find();
        codeRes.send(students);
    } catch (error) {
        codeRes.status(500).send({ message: error.message });
    }
});

// READ ONE: Get a single student by MongoDB ID
app.get('/api/students/:id', async (codeReq, codeRes) => {
    try {
        const student = await Student.findById(codeReq.params.id);
        if (!student) return codeRes.status(404).send({ message: 'Student not found.' });
        codeRes.send(student);
    } catch (error) {
        codeRes.status(500).send({ message: error.message });
    }
});

// UPDATE: Modify an existing student record by ID
app.put('/api/students/:id', async (codeReq, codeRes) => {
    try {
        const student = await Student.findByIdAndUpdate(
            codeReq.params.id,
            {
                name: codeReq.body.name,
                age: codeReq.body.age,
                course: codeReq.body.course,
                rollNumber: codeReq.body.rollNumber
            },
            { new: true, runValidators: true } // Returns the modified document rather than original
        );

        if (!student) return codeRes.status(404).send({ message: 'Student not found.' });
        codeRes.send(student);
    } catch (error) {
        codeRes.status(400).send({ message: error.message });
    }
});

// DELETE: Erase a student record by ID
app.delete('/api/students/:id', async (codeReq, codeRes) => {
    try {
        const student = await Student.findByIdAndDelete(codeReq.params.id);
        if (!student) return codeRes.status(404).send({ message: 'Student not found.' });
        codeRes.send({ message: 'Student record deleted successfully.', student });
    } catch (error) {
        codeRes.status(500).send({ message: error.message });
    }
});

// 4. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
