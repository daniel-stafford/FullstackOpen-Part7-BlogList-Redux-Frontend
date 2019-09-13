import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import Comment from './Comment'
import { Button, Header } from 'semantic-ui-react'
const DetailedBlog = props => {
  const blog = props.blog
  const [comment, setComment] = useState('')
  const handleAddComment = e => {
    e.preventDefault()
    const commentObject = {
      comment,
      blog: blog.id
    }
    props.addComment(props.blog, commentObject)
  }
  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <Header as='h2'>{blog.title}</Header>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={() => props.handleLike(props.blog)}>Like</button>
      </p>
      <p>Added by {blog.user.name}</p>
      <form onSubmit={handleAddComment}>
        <div>
          <input
            type='text'
            value={comment}
            name='comment'
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type='submit'>Add comment</Button>
        </div>
      </form>
      {blog.comments && (
        <ul>
          {blog.comments.map(comment => {
            return (
              <li key={comment.id}>
                <Comment comment={comment} />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

const mapDispatchToProps = { addComment }
export default connect(
  null,
  mapDispatchToProps
)(DetailedBlog)
