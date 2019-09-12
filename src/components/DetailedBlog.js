import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const DetailedBlog = props => {
  const blog = props.blog
  const [comment, setComment] = useState('')
  const handleAddComment = e => {
    e.preventDefault()
    const commentObject = {
      comment,
      blog
    }
    console.log('commentObject', commentObject)
    props.addComment(props.blog, commentObject)
  }
  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
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
            name='commment'
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>Add comment</button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = { addComment }
export default connect(
  null,
  mapDispatchToProps
)(DetailedBlog)
