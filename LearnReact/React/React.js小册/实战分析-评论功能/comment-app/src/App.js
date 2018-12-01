import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class App extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    this._loadComment()
  }

  _loadComment = () => {
    let comments = localStorage.getItem('comments')
    if (comments) {
      this.setState({ comments: JSON.parse(comments) })
    }
  }

  _saveComment = (comments) => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleDeleteComment = (index) => {
    const { comments } = this.state
    comments.splice(index, 1)
    this.setState({ comments })
    // 更新 localStorage
    this._saveComment(comments)
  }

  handleSubmitComment (comment) {
    let { comments } = this.state
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    comments.push(comment)
    this.setState({
      comments: this.state.comments
    })
    this._saveComment(comments)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList onDeleteComment={this.handleDeleteComment} comments={this.state.comments}/>
      </div>
    )
  }
}

export default App
