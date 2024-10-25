import { useState, useEffect } from 'react';
import "./index.css";
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo) return;

    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });

    const data = await response.json();
    setTodos([...todos, data.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  const updateTodo = async (id) => {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: editTodoTitle }),
    });

    if (response.ok) {
      setTodos(todos.map((todo) => (todo._id === id ? { ...todo, title: editTodoTitle } : todo)));
      setEditTodoId(null);
      setEditTodoTitle('');
    }
  };

  return (
    <div className='main'>
      <div className="ListInput">
        <h1>Todo List</h1>

        <input className='in-val'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo" 
          
        />
        <button onClick={addTodo} style={{backgroundColor:'blue',color:'white', width:'80px',height:'30px',fontWeight:'600',border:'1px solid  blue',borderRadius:'6px',cursor:'pointer'}}>Add Todo</button>
</div>
<div className='List'>
  <ol>
    {todos.map((todo, index) => (
      <li key={todo._id}>
        <span>{editTodoId === todo._id ? (
          <>
            <input
              type="text"
              value={editTodoTitle}
              onChange={(e) => setEditTodoTitle(e.target.value)}
              style={{ width: '250px',height:'25px' }} 
            />
            <button onClick={() => updateTodo(todo._id)}
              style={{
                backgroundColor: 'blue',
                color: 'white',
                width: '50px',
                height: '30px',
                fontWeight: '600',
                border: '1px solid blue',
                cursor: 'pointer',
                marginLeft: '10px',
                borderRadius:'6px'
              }}>
              Save
            </button>
          </>
        ) : (
          <span>{index + 1}. {todo.title}</span> 
        )}</span>

        <div className='btnsgrop'>
         
            <img onClick={() => deleteTodo(todo._id)} src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCI+PHBhdGggZmlsbD0iIzJmODhmZiIgc3Ryb2tlPSIjMDAwIiBkPSJNOSAxMFY0NEgzOVYxMEg5WiIvPjxwYXRoIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjAgMjBWMzMiLz48cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTI4IDIwVjMzIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00IDEwSDQ0Ii8+PHBhdGggZmlsbD0iIzJmODhmZiIgc3Ryb2tlPSIjMDAwIiBkPSJNMTYgMTBMMTkuMjg5IDRIMjguNzc3MUwzMiAxMEgxNloiLz48L2c+PC9zdmc+'/>
       
          <img onClick={() => {
            setEditTodoId(todo._id);
            setEditTodoTitle(todo.title);
          }} src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMyZDgzYWUiIGQ9Ik0xNi42OTggMjEuOTk2aC0xMS42YTMuMDYgMy4wNiAwIDAgMS0yLjItLjkyYTMuMSAzLjEgMCAwIDEtLjktMi4yMVY3LjI3NmEzIDMgMCAwIDEgLjkxLTIuMTlhMyAzIDAgMCAxIDEtLjY3YTMuMSAzLjEgMCAwIDEgMS4yLS4yNGg0LjQ0YS43NS43NSAwIDAgMSAwIDEuNWgtNC40NGEyIDIgMCAwIDAtLjYzLjEyYTEuNjIgMS42MiAwIDAgMC0uOTkgMS41djExLjU5YTEuNjIgMS42MiAwIDAgMCAuNDcgMS4xNmExLjYyIDEuNjIgMCAwIDAgMS4xNS40N2gxMS42Yy4yMTMgMCAuNDIzLS4wNC42Mi0uMTJhMS41IDEuNSAwIDAgMCAuNTItLjM1YTEuNSAxLjUgMCAwIDAgLjM1LS41MmExLjUgMS41IDAgMCAwIC4xMy0uNjN2LTQuNDRhLjc1Ljc1IDAgMSAxIDEuNSAwdjQuNDdhMy4wNiAzLjA2IDAgMCAxLS45MiAyLjJhMy4yIDMuMiAwIDAgMS0xIC42OGMtLjM4Ny4xNC0uNzk4LjIwNS0xLjIxLjE5Ii8+PHBhdGggZmlsbD0iIzJkODNhZSIgZD0iTTIxLjgwOCA1LjQ1NmExLjkgMS45IDAgMCAwLS40Ni0uNjhsLTIuMTUtMi4xNWExLjkgMS45IDAgMCAwLS42OC0uNDZhMi4xIDIuMSAwIDAgMC0yLjMxLjQ2bC0xLjcxIDEuNzF2LjA1bC03Ljc0IDcuNzNhMi4xIDIuMSAwIDAgMC0uNjEgMS40OHYyLjE3YTIuMTIgMi4xMiAwIDAgMCAyLjExIDIuMTFoMi4xN2EyLjA3IDIuMDcgMCAwIDAgMS40OC0uNjJsNy43NC03Ljc0bDEuNzItMS43MmMuMjAyLS4xOS4zNi0uNDIyLjQ2LS42OGEyIDIgMCAwIDAgMC0xLjYzem0tMS4zOCAxLjA1YS42LjYgMCAwIDEtLjE0LjJsLTEuMjIgMS4yMmwtMy0zbDEuMjMtMS4yM2EuNjQuNjQgMCAwIDEgLjQ0LS4xOGEuNi42IDAgMCAxIC4yMy4wNXEuMTE2LjA0OS4yLjE0bDIuMTYgMi4xNWEuNy43IDAgMCAxIC4xMy4yYS42LjYgMCAwIDEgMCAuMjNhLjYuNiAwIDAgMS0uMDMuMjIiLz48L3N2Zz4='/>
        </div>
      </li>
    ))}
  </ol>
</div>


    </div>
  );
}
