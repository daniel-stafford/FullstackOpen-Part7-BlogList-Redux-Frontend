import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [expandBlog, setExpandBlog] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      <div
        className='wholeBlog'
        onClick={() => {
          console.log('blog clicked!')
          setExpandBlog(!expandBlog)
        }}
      >
        {blog.title} {blog.author}
        {expandBlog && (
          <div className='extraContent'>
            <p>{blog.url}</p>
            <p>
              {blog.likes} likes{' '}
              <button onClick={() => handleLike({ blog })}>Like</button>
            </p>
            <p>Added by {blog.user.name}</p>
            {user.username === blog.user.username && (
              <button onClick={() => handleRemove({ blog })}>Remove</button>
            )}
          </div>
        )}
      </div>

      <div></div>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
