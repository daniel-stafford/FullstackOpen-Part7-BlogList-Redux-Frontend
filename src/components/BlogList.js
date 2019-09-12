import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleRemove }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => {
          return b.likes - a.likes
        })
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  )
}

const mapStateToProps = state => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps)(BlogList)
