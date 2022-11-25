import React, { useState } from 'react';

function ItemAdd({onItemAdd}) {
  
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (label) {
      onItemAdd(label, min, sec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="Text"
        className="new-todo"
        placeholder="Type to create Task"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        value={min}
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        value={sec}
        placeholder="Sec"
        onChange={(e) => setSec(e.target.value)}
      />
      <button className="submitButton" type="submit">
        {' '}
      </button>
    </form>
  );
}

export default ItemAdd;
