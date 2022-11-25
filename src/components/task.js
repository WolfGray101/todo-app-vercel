import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function Task(itemProps) {
  const { taskLabel, done, date, id, onToggleDone, onDeleted, onEditTaskLabel, min, sec } =
    itemProps;
  const [timerValue, setTimerValue] = useState(+min * 60 + +sec);
  const [isVisible, setVisible] = useState(true);
  const [editLabel, setLabel] = useState('');
  const [timerID, setTimerID] = useState(null);

  const displayMin = Math.floor(timerValue / 60);
  const displaySec = timerValue % 60;
  const completed = done ? 'completed' : '';

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editLabel) {
      onEditTaskLabel(editLabel);
      setLabel('');
    }
    setVisible(true);
  };

  const onStopTimer = () => {
    clearInterval(timerID);
  };

  const onStartTimer = (timerId) => {
    if (timerId) clearInterval(timerID);
    const timer = setInterval(() => {
      setTimerValue((s) => (s > 0 ? s - 1 : 0));
      setTimerID(timer);
    }, 1000);
  };

  if (done) onStopTimer();

  return (
    <li className={completed}>
      <form hidden={isVisible} onSubmit={onSubmit}>
        <input
          type="Text"
          className="new-todo"
          placeholder="Type to Edit Task"
          onChange={onLabelChange}
          value={editLabel}
        />
      </form>
      <div className="view">
        <input className="toggle" onChange={onToggleDone} type="checkbox" id={id} />
        <label htmlFor={id} aria-label="Task">
          <span
            className="description"
            role="presentation"
          >
            {taskLabel}
          </span>
          <span className="description time">
            <button
              type="button"
              aria-label="play button"
              className=" icon-play"
              onClick={onStartTimer}
            />
            <button
              type="button"
              aria-label="pause button"
              className=" icon-pause"
              onClick={onStopTimer}
            />
            <span>
              {displayMin}min {displaySec}sec
            </span>
          </span>
          <span className="created">
            {formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })}
          </span>
        </label>
        <button
          type="button"
          aria-label="Edit button"
          className="icon icon-edit"
          onClick={() => setVisible(!isVisible)}
        />
        <button
          type="button"
          aria-label="Destroy button"
          className="icon icon-destroy"
          onClick={onDeleted}
        />
      </div>
    </li>
  );
}

export default Task;
