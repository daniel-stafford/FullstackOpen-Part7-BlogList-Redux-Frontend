import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
          console.log('username', user.username)
          console.log('blog username', blog.user.username)
          setExpandBlog(!expandBlog)
        }}
      >
        <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
        {blog.author}
      </div>

      <div></div>
    </div>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Blog)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
