import { useState } from "react";
import "./App.css";

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);

  function addExpense() {
    if (expense === "" || amount === "" || date === "") {
      alert("Please enter all details");
      return;
    }

    setList([
      ...list,
      {
        expense: expense,
        amount: Number(amount),
        date: date
      }
    ]);

    setExpense("");
    setAmount("");
    setDate("");
  }

  // Calculate month-wise expense
  function getMonthTotal(month) {
    return list
      .filter((item) => item.date.substring(0, 7) === month)
      .reduce((total, item) => total + item.amount, 0);
  }

  // Get all months
  const months = [...new Set(
    list.map((item) => item.date.substring(0, 7))
  )];

  return (
    <div className="container">

      <h2>Personal Expense Tracker</h2>

      <input
        type="text"
        placeholder="Expense / Reason"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={addExpense}>
        Add Expense
      </button>

      <h3>Expense List</h3>

      {list.map((item, index) => (
        <div className="expense" key={index}>
          <p>
            <b>Expense / Reason:</b> {item.expense}
          </p>

          <p>
            <b>Amount:</b> ₹{item.amount}
          </p>

          <p>
            <b>Date:</b> {item.date}
          </p>
        </div>
      ))}

      <h3>Month-wise Expenses</h3>

      {months.map((month) => (
        <div className="month" key={month}>
          <b>{month}</b>
          <span>₹{getMonthTotal(month)}</span>
        </div>
      ))}

    </div>
  );
}

export default App;