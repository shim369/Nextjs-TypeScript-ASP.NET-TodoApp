import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { ToDoItem } from '../types/todo';
import axios from 'axios';

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [dueDate, setDueDate] = useState("");
  
    useEffect(() => {
      fetchTodos();
    }, []);

    const submitForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const newItem = {
            title: title,
            url: url,
            dueDate: dueDate
        };

        try {
          await axios.post('http://localhost:5082/api/todo', newItem);
          setTitle("");
          setUrl("");
          setDueDate("");
          fetchTodos();
        } catch (error) {
            console.error('Error during todo item creation:', error);
        }
    };
  
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:5082/api/todo');
      const data = await res.json();
      setTodos(data);
    };

    const deleteToDo = async (id: number) => {
        await axios.delete(`http://localhost:5082/api/todo/${id}`);
        fetchTodos();
    };

    const toggleComplete = async (id: number, isComplete: boolean) => {
        const updatedItem = todos.find((todo) => todo.id === id);
        if (!updatedItem) return;

        updatedItem.isComplete = isComplete;
        await axios.put(`http://localhost:5082/api/todo/${id}`, updatedItem);
        fetchTodos();
    };
  
    return (
      <>
      <Head>
        <title>Next.js + ASP.NET ToDo App</title>
      </Head>
      <main className={styles.main}>
        <h1>ToDo List</h1>
        <form onSubmit={submitForm} className={styles.form}>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Url" value={url} onChange={e => setUrl(e.target.value)} />
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /> {/* 追加 */}
            <button type="submit" className={styles.addButton}>Create</button>
        </form>
        <ul className={styles.todoListBox}>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className={styles.todoLeftBox}>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={(e) => toggleComplete(todo.id, e.target.checked)}
                />
                <p className={styles.dueDate}>{new Date(todo.dueDate).toLocaleDateString()}</p>
                <p><a href={todo.url} target="_blank" rel="noopener noreferrer">{todo.title}</a></p>
              </div>
              <button className={styles.deleteButton} onClick={() => deleteToDo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
      </>
    );
};
