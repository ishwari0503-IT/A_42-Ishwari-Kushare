import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [dept, setDept] = useState("");
    const [marks, setMarks] = useState("");
    const [show, setShow] = useState(false);

    return (
        <div className="container">
            <h2>Student Information</h2>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Roll No"
                onChange={(e) => setRoll(e.target.value)}
            />

            <input
                placeholder="Department"
                onChange={(e) => setDept(e.target.value)}
            />

            <input
                placeholder="Marks"
                onChange={(e) => setMarks(e.target.value)}
            />

            <button onClick={() => setShow(true)}>Submit</button>

            {show && (
                <div className="details">
                    <h3>Student Details</h3>
                    <p>Name: {name}</p>
                    <p>Roll No: {roll}</p>
                    <p>Department: {dept}</p>
                    <p>Marks: {marks}</p>
                </div>
            )}
        </div>
    );
}

export default App;