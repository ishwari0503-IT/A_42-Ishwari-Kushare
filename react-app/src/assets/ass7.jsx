import { useState } from "react";
import "./ass7.css";

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  function addExpense() {
    setList([...list, { expense, amount }]);
    setExpense("");
    setAmount("");
  }

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <input
        placeholder="Expense"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>Add</button>

      <h3>Expenses</h3>

      {list.map((item, index) => (
        <p className="expense" key={index}>
          {item.expense} - ₹{item.amount}
        </p>
      ))}
    </div>
  );
}

export default App;