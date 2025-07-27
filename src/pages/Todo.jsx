import React, { useState, useEffect } from 'react';
import './todo.css';

const Todo = () => {
  const rupee = "₹";

  const [date, setDate] = useState('');
  const [task, setTask] = useState('');
  const [note, setNote] = useState('');
  const [todos, setTodos] = useState([]);
  const [money, setMoney] = useState('');
  const [budget, setBudget] = useState(() => {
    // Get budget from localStorage or default ''
    return localStorage.getItem('budget') || '';
  });

  // Alert shown state to avoid repeated alerts
  const [alertShown, setAlertShown] = useState(false);

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    if (budget) {
      localStorage.setItem('budget', budget);
    } else {
      localStorage.removeItem('budget');
    }
  }, [budget]);

  // Calculate total spend
  const totalSpent = todos.reduce((sum, t) => sum + t.money, 0);
  const budgetExceeded = budget && totalSpent > parseFloat(budget);

  // Show alert once on budget exceed
  useEffect(() => {
    if (budgetExceeded && !alertShown) {
      alert('Limit Exceeded!');
      setAlertShown(true);
    }
    if (!budgetExceeded && alertShown) {
      setAlertShown(false);
    }
  }, [budgetExceeded, alertShown]);

  const handleAddTodo = () => {
    if (!date || !task) return;
    const newTodo = {
      date,
      task,
      note,
      money: parseFloat(money),
    };
    setTodos([...todos, newTodo]);
    setTask('');
    setNote('');
    setMoney('');
    // Keep budget intact, so no setBudget here
  };

  const groupedTodos = todos.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] || [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <div className="todo-container">
      <h1 className="todo-heading">📝 My Expense Todo Tracker</h1>

      <div className="todo-inputs">
        <input
          type='number'
          placeholder={`Set Monthly Budget (${rupee})`}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <p
          style={{
            color: budgetExceeded ? 'white' : 'green',
            backgroundColor: budgetExceeded ? 'red' : 'transparent',
            fontWeight: 'bold',
            padding: "3px",
            borderRadius: '4px',
            maxWidth: 'fit-content',
          }}
        >
          Total Spent: {rupee}{totalSpent.toFixed(2)} {budget && ` / Budget: ${rupee}${budget}`}
        </p>
      </div>

      <div className="todo-inputs">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Add Task" value={task} onChange={(e) => setTask(e.target.value)} />
        <input
          type='number'
          placeholder={`Spent (${rupee})`}
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
        <textarea placeholder="Optional Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <div className="todo-list">
        {Object.keys(groupedTodos).sort().map((todoDate) => {
          const daySpend = groupedTodos[todoDate].reduce((sum, t) => sum + t.money, 0);

          return (
            <div key={todoDate} className="todo-group">
              <h3>{todoDate} - Spent: {rupee}{daySpend.toFixed(2)}</h3>
              {groupedTodos[todoDate].map((item, index) => (
                <div className="todo-item" key={index}>
                  <p><strong>Task:</strong> {item.task}</p>
                  {item.note && <p><em>Note:</em> {item.note}</p>}
                  <p><em>Spent:</em> {rupee}{item.money.toFixed(2)}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
