import React from 'react'
import '../index.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends React.Component {
  
  state = {
    label: '',
    vis: false,
    timerValue:0,
    idTimer:0,
    min: 0,
    sec: 0
  }

  componentDidMount() {
    const { min, sec } = this.props
    this.setState({ timerValue: (+min*60 + +sec), 
      min, 
      sec})  
  }

  componentDidUpdate(_, prevState) {
    const { timerValue } = this.state
    if (prevState.timerValue !== timerValue && timerValue <= 0) {
      this.setState({ timerValue: 0 })
      this.onStopTimer()
    }
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
        vis: false     
      })
    }
  }

  editTask = () => {
    this.setState((prevState) => ({
      vis: !prevState.vis,
    }))
  }

  onStartTimer = () => {
    const teme = setInterval(() => {
      this.setState(prevState => ({
        timerValue: prevState.timerValue-1,
        min: Math.floor((prevState.timerValue-1)/60),
        sec: (prevState.timerValue-1)%60
      })
      )}, 1000)
    this.setState({ idTimer: teme})
    console.log(this.state.idTimer, this.state.timerValue);
  }

  onStopTimer = () => {
    clearInterval(this.state.idTimer)
   
  }

  render() {
    const { onDeleted, onToggleDone, label, done, date, checkedd } = this.props

    
    const isEditing = this.state.vis
    const clazz = isEditing ? '' : 'hidden'
    const newClassName = done? 'completed' : ''    
    
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
          <input className="toggle" onChange={onToggleDone}  type="checkbox" id={label} checked={checkedd}/>
          <label htmlFor="{label}" aria-label="Task">
            <span className="description" onClick={onToggleDone} onKeyDown={onToggleDone} role="presentation">
              {label}
            </span>
            <span className="description time">
              <button type="button" aria-label="play button" className=" icon-play" onClick={this.onStartTimer}/>
              <button type="button" aria-label="pause button" className=" icon-pause" onClick={this.onStopTimer}/>
              <span> {this.state.min}min {this.state.sec}sec </span>
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
