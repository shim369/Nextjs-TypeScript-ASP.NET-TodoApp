import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { ToDoItem } from '../types/todo';


export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  
    useEffect(() => {
      fetchTodos();
    }, []);
  
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:5082/api/todo');
      const data = await res.json();
      setTodos(data);
    };
  
    return (
      <>
      <Head>
        <title>Next.js + ASP.NET ToDo App</title>
      </Head>
      <main className={styles.main}>
        <h1>ToDo List</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.url}</p>
              <p>{new Date(todo.dueDate).toLocaleDateString()}</p>
              <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
            </li>
          ))}
        </ul>
      </main>
      </>
    );
};