import React, { Component } from 'react'

class CommentInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  componentDidMount() {
    this.textRef.focus()
    this._loadUsername()
  }

  _loadUsername = () => {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername  = (username) => {
    localStorage.setItem('username', username)
  }

  handleUsernameBlur = (event) => {
    this._saveUsername(event.target.value)
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createTime: +new Date()
      })
    }
    this.setState({ content: '' })
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur}
              onChange={this.handleUsernameChange} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textRef) => this.textRef = textRef}
              value={this.state.content}
              onChange={this.handleContentChange} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit}
          >
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
