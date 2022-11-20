import React, { Component } from 'react'
import '../index.css'

export default class ItemAdd extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      label: '',
      min: '',
      sec: ''
    }
    // this.onLabelChange = this.onLabelChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }

  onLabelChange = (e)  => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label) {
      this.props.onItemAdd(this.state.label, this.state.min, this.state.sec,)
      this.setState({ 
        label: '',
        min: '', 
        sec: ''
      })
    }
  }

  render() {
    return (
      <form className = "new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="Text"
          className="new-todo"
          placeholder="Type to create Task"
          onChange={(e) => this.onLabelChange(e)}
          value={this.state.label}
        />
        <input className="new-todo-form__timer" 
          value={this.state.min}
          placeholder="Min" 
          onChange={(e) => this.onMinChange(e)}/>
        <input className="new-todo-form__timer" 
          value={this.state.sec}
          placeholder="Sec"
          onChange={(e) => this.onSecChange(e)} />
        <button className ="submitButton" type='submit'> </button>
      </form>
    )
  }
}
