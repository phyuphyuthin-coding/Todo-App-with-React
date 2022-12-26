import React, { useState, useEffect } from 'react';
import './App.css';
//Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  useEffect(() => {
    console.log('useEffect 2')
    getLocalTodos();
  }, []);

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    console.log('useEffect 1')
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;

      case ('uncompleted'):
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = () => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
      if (todoLocal) {
        setTodos(todoLocal);
      }
      //console.log(`Items in localstorage => `+  todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  )
}

export default App;
