import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TaskList from './components/taskList';
import Footer from './components/footer';
import ItemAdd from './components/itemAddd';

function App() {
  const [ maxID, setMaxID ] = useState(100);

  const [todoData, setTodoData] = useState([
    {
      taskLabel: 'Example task',
      done: false,
      min: 10,
      sec: 15,
      id: maxID,
      date: new Date()
    },
  ]);
  const [filter, setFilter] = useState('all');

  const deleteTask = (id) => {
    setTodoData((prevTodoData ) => {
      const ind = prevTodoData.findIndex((el) => el.id === id);
      const newArray = [...prevTodoData.slice(0, ind), ...prevTodoData.slice(ind + 1)];
      return newArray ;
    });
  };

  const onActive = () => {
    setTodoData((prevTodoData ) => {
      const arrActive = prevTodoData.filter((el) => el.done === false);
      return arrActive ;
    });
  };

  const createTodoItem = (taskLabel, min, sec) => {
    // eslint-disable-next-line no-param-reassign
    if (!+min) min = 0;
    // eslint-disable-next-line no-param-reassign
    if (!+sec) sec = 0;
    setMaxID((s) => s+1 )
    return {
      taskLabel,
      done: false,
      id: maxID+1,
      date: new Date(),
      min,
      sec,
    };
  };

  const addTask = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoData((prevTodoData) => {
      const newArray = [...prevTodoData, newItem];
      return  newArray
    });
  };

  const onToggleDone = (id) => {
    setTodoData(( prevTodoData ) => {
      const ind = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[ind];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...prevTodoData.slice(0, ind), newItem, ...prevTodoData.slice(ind + 1)];
      return newArray 
    });
  };

  const editTaskLabel = (id, text) => {
    setTodoData((prevTodoData) => {
      const ind = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[ind];
      const newItem = { ...oldItem, taskLabel: text };
      const newArray = [...prevTodoData.slice(0, ind), newItem, ...prevTodoData.slice(ind + 1)];
      return newArray 
    });
  };

  const onFilterChange = (curFilter) => {
    setFilter(curFilter);
  };

  const onFilter = (items, curFilter) => {
    switch (curFilter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const visibleItems = onFilter(todoData, filter);
  const doneCount = todoData.filter((el) => !el.done).length;
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <ItemAdd onItemAdd={addTask} />
      <TaskList
        todos={visibleItems}
        onDeleted={deleteTask}
        onToggleDone={onToggleDone}
        onItemAdd={addTask}
        onEditTaskLabel={editTaskLabel}
      />
      <Footer
        doneCount={doneCount}
        filter={filter}
        onActive={onActive}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
