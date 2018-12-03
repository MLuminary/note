import React, { Component } from 'react'

import CommentInput from './CommentInput'
import CommentList from './CommentList'
import WrappedComponent from './WrappedComponent'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: props.data
    }
  }

  static getDerivedStateFromProps(props) {
    return {
      comments: props.data
    }
  }

  handleDeleteComment = (index) => {
    const { comments } = this.state
    comments.splice(index, 1)
    this.setState({ comments })
    // 更新 localStorage
    this.props.saveData(comments)
  }

  handleSubmitComment =  (comment) => {
    let { comments } = this.state
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    comments.push(comment)
    this.setState({
      comments: this.state.comments
    })
    this.props.saveData(comments)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment} />
        <CommentList onDeleteComment={this.handleDeleteComment} comments={this.state.comments}/>
      </div>
    )
  }
}

App = WrappedComponent(App, 'comments')

export default App
