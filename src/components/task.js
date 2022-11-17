import React from 'react'
import '../index.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends React.Component {
  state = {
    label: '',
    vis: false,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
      vis: true,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label) {
      this.props.onEditTaskLabel(this.state.label)
      this.setState({
        label: '',  
        vis: false,
      })
    }
  }

  editTask = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      vis: !prevState.vis,
    }))
  }

  render() {
    const { onDeleted, onToggleDone, label, done, date } = this.props

    let newClassName = ''
    const isEditing = this.state.vis
    if (done) newClassName += 'completed'
    const clazz = isEditing ? '' : 'hidden'
    return (
      <li className={newClassName}>
        <form className={clazz} onSubmit={this.onSubmit}>
          <input
            type="Text"
            className="new-todo"
            placeholder="Type to Edit Task"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
        <div className="view">
          <input className="toggle" type="checkbox" id={label} />
          <label htmlFor="{label}" aria-label="Task">
            <span className="description" onClick={onToggleDone} onKeyDown={onToggleDone} role="presentation">
              {label}
            </span>
            <span>
              <button type="button" aria-label="play button" className="icon icon-play"/>
              <button type="button" aria-label="pause button" className="icon icon-pause"/>
              12:55
            </span>
            <span className="created">{formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })}</span>
          </label>
          <button type="button" aria-label="Edit button" className="icon icon-edit" onClick={this.editTask} />
          <button type="button" aria-label="Destroy button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}
