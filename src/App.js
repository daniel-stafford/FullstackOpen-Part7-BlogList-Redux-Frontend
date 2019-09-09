import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { useField } from './hooks'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addLike,
  deleteBlog,
  addBlog
} from './reducers/blogReducer'
import { removeUser, addUser } from './reducers/userReducer'

const App = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const user = props.user
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const password = useField('password')
  const username = useField('text')

  /* eslint-disable */
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.addUser(user)
      // setUser(user)
    }
  }, [])
  /* eslint-enable */

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.data.value,
        password: password.data.value
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      // setUser(user)
      props.addUser(user)
      props.setNotification('Correct credentials', 'success', 5)
    } catch (exception) {
      props.setNotification('Wrong credentials', 'error', 5)
    }
  }

  const handleLike = async blog => {
    try {
      const newObject = { ...blog.blog, likes: blog.blog.likes + 1 }
      props.addLike(blog.blog, newObject)
      props.setNotification(`Liked!`, 'success', 2)
    } catch (error) {
      props.setNotification(`error: ${error}`, 'error', 5)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input {...username.data} />
      </div>
      <div>
        password
        <input {...password.data} />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleLogOut = () => {
    // console.log('you clicked log out')
    // setUser(null)
    // window.localStorage.clear()
    props.removeUser()
    props.setNotification(`Logged out`, 'success', 5)
  }

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  const handleAddBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        title,
        author,
        url,
        user,
        likes: 0
      }

      // const proessedBlog = await blogService.create(blogObject)
      // setBlogs(blogs.concat(proessedBlog))
      props.addBlog(blogObject)
      props.setNotification(`blog added`, 'success', 5)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      props.setNotification(`Error adding blog ${exception}`, 'error', 5)
    }
  }

  const handleRemove = async ({ blog }) => {
    console.log('you clicked remove', blog.id)
    if (
      window.confirm(
        `Do you really want to remove ${blog.title} by ${blog.author}`
      )
    ) {
      try {
        props.deleteBlog(blog, user.token)
        // await blogService.remove(blog.id, user.token)
        // setBlogs(blogs.filter(p => p.id !== blog.id))
        props.setNotification(`${blog.title} deleted!`, 'success', 5)
      } catch (error) {
        props.setNotification(`${blog.title} not deleted! ${error}`, 'error', 5)
      }
    }
  }

  return (
    <div>
      <h1>Blog</h1>
      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in<button onClick={handleLogOut}>Log out</button>
          </p>
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
            />
            <button onClick={() => setAddBlogVisible(false)}>Cancel</button>
          </div>
          {props.blogsStore
            .sort((a, b) => {
              return b.likes - a.likes
            })
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                user={user}
              />
            ))}
        </div>
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return { blogsStore: state.blogs, user: state.user }
}
const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  addLike,
  deleteBlog,
  addBlog,
  removeUser,
  addUser
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
