import React, { Component } from 'react'
import '../index.css'

export default class ItemAdd extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      label: '',
    }
    this.onLabelChange = this.onLabelChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onLabelChange(e) {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.state.label) {
      this.props.onItemAdd(this.state.label)
      this.setState({ label: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="Text"
          className="new-todo"
          placeholder="Type to create Task"
          onChange={(e) => this.onLabelChange(e)}
          value={this.state.label}
        />
      </form>
    )
  }
}
