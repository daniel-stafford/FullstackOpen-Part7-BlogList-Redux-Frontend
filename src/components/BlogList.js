import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { Table, Button } from 'semantic-ui-react'

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
        <Button onClick={() => setAddBlogVisible(true)}>New Post</Button>
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
        <Button secondary onClick={() => setAddBlogVisible(false)}>
          Cancel
        </Button>
      </div>
      <Table striped celled>
        <Table.Body>
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
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps)(BlogList)
