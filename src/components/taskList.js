/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import Task from './task'

function TaskList({ todos, onDeleted, onToggleDone, onEditTaskLabel }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEditTaskLabel={(text) => onEditTaskLabel(id, text)}
      />
    )
  })  

  return (
    <div className="main">
      <ul className="todo-list">{elements}</ul>
    </div>
  )
}

export default TaskList
