import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import DetailedBlog from './components/DetailedBlog'

import { Container, Button, Menu, Header } from 'semantic-ui-react'

const App = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const password = useField('password')
  const username = useField('text')

  /* eslint-disable */
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.addUser(user)
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
      props.addUser(user)
      props.setNotification('Correct credentials', 'success', 5)
    } catch (exception) {
      props.setNotification('Wrong credentials', 'error', 5)
    }
  }

  const handleLike = async blog => {
    console.log('handleLike blog', blog)
    try {
      const newObject = { ...blog, likes: blog.likes + 1 }
      props.addLike(blog, newObject)
      props.setNotification(`Liked!`, 'success', 2)
    } catch (error) {
      props.setNotification(`error: ${error}`, 'error', 5)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <Header as='h2'>Login</Header>
      <div>
        username
        <input {...username.data} />
      </div>
      <div>
        password
        <input {...password.data} />
      </div>
      <Button type='submit'>login</Button>
    </form>
  )

  const handleLogOut = () => {
    props.removeUser()
    props.setNotification(`Logged out`, 'success', 5)
  }

  const handleAddBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        title,
        author,
        url,
        user: props.user,
        likes: 0
      }

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
        props.deleteBlog(blog, props.user.token)
        props.setNotification(`${blog.title} deleted!`, 'success', 5)
      } catch (error) {
        props.setNotification(`${blog.title} not deleted! ${error}`, 'error', 5)
      }
    }
  }

  const findById = (source, id) => {
    return source.find(u => u.id === id)
  }

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <Container>
      <Router>
        <div>
          <h1>Blog</h1>
          <Notification />
          {props.user === null ? (
            loginForm()
          ) : (
            <div>
              <div>
                <Menu inverted style={{ marginBottom: '10px' }}>
                  <Menu.Item link>
                    <Link style={{ padding: 5 }} to='/'>
                      Blogs
                    </Link>
                  </Menu.Item>
                  <Menu.Item link>
                    <Link style={{ padding: 5 }} to='/users'>
                      Users
                    </Link>
                  </Menu.Item>
                  <Menu.Item link>
                    {props.user.name} logged in
                    <Button
                      primary
                      onClick={handleLogOut}
                      style={{ marginLeft: '10%' }}
                    >
                      Log out
                    </Button>
                  </Menu.Item>
                </Menu>
              </div>
              <Route
                exact
                path='/'
                render={() => (
                  <BlogList
                    handleLike={handleLike}
                    handleRemove={handleRemove}
                    handleAddBlog={handleAddBlog}
                    title={title}
                    setTitle={setTitle}
                    author={author}
                    setAuthor={setAuthor}
                    url={url}
                    setUrl={setUrl}
                    setAddBlogVisible={setAddBlogVisible}
                    hideWhenVisible={hideWhenVisible}
                    showWhenVisible={showWhenVisible}
                  />
                )}
              />
              <Route exact path='/users' render={() => <UserList />} />
              <Route
                exact
                path='/users/:id'
                render={({ match }) => (
                  <User user={findById(props.users, match.params.id)} />
                )}
              />
              <Route exact path='/blogs' render={() => <BlogList />} />
              <Route
                exact
                path='/blogs/:id'
                render={({ match }) => (
                  <DetailedBlog
                    blog={findById(props.blogs, match.params.id)}
                    handleLike={handleLike}
                    handleRemove={handleRemove}
                  />
                )}
              />
            </div>
          )}
        </div>
      </Router>
    </Container>
  )
}
const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user, users: state.users }
}
const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUsers,
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
