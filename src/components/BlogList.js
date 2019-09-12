import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({
  blogs,
  handleLike,
  handleRemove,
  handleAddBlog,
  hideWhenVisible,
  showWhenVisible,
  setAddBlogVisible,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl
}) => {
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>New Post</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          handleAddBlog={handleAddBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          setAddBlogVisible={setAddBlogVisible}
        />
        <button onClick={() => setAddBlogVisible(false)}>Cancel</button>
      </div>
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
