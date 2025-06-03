import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (title.trim() === '') return

    const newTask = {
      id: Date.now(),
      title,
      image,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTitle('')
    setImage('')
  }

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <form onSubmit={handleAddTask}>
        <div class="hola">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Imagen (emoji o URL opcional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button class="agregar" type="submit">
            <img
              src="https://www.pngall.com/wp-content/uploads/19/Joyful-Check-Mark-Style-PNG.png"
              alt="Agregar"
              width="30"
              height="30"
            />
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <p>No hay tareas aún.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.image && (
                <img
                  src={task.image}
                  alt="icono"
                  width="30"
                  height="30"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <button class="estadoTarea" onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <button class="eliminar" onClick={() => deleteTask(task.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
