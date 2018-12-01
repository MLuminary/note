import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
  static defaultProps = {
    comments: [],
    onDeleteComment: null
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment onDeleteComment={this.props.onDeleteComment} index={i} comment={comment} key={i} />
        )}
      </div>
    )
  }
}

export default CommentList
