import React, { useState } from 'react';
import { nanoid } from "nanoid";
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


// Rendereriza todas as tarefas usando o componente Todo.
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  

  const taskList = tasks.map((task)=> (
    <Todo 
      id={ task.id } 
      name={ task.name } 
      completed={ task.completed }
      key={ task.id }
      toggleTaskCompleted={ toggleTaskCompleted }
      deleteTask={ deleteTask }
      editTask={ editTask }
    />
    )
  );

  // Masca e desmarca o task não só na UI
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Delete uma tarefa do array.
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  // Edita uma tarefa.
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // Se essa tarefa tem o mesmo id que a editada
      if (id === task.id){
        return {...tasks, name: newName}
        //
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'; // Se tiver apenas uma tarefa imprime na tela 'task'.
  const headingText = `${taskList.length} ${tasksNoun} remaining `; // Mostra quantas tarefas temos.

  // Adiciona uma nova tarefa.
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Retorno do que o React vai renderizar.
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
        <Form addTask={ addTask }/>
      <div className="filters btn-group stack-exception">
        <FilterButton btn="All"/>
        <FilterButton btn="Active"/>
        <FilterButton btn="Completed"/>
      </div>
      <h2 id="list-heading">{ headingText }</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        { taskList }
      </ul>
    </div>
  );
}

// Exporta o componente App para ser usado no index.js
export default App;
