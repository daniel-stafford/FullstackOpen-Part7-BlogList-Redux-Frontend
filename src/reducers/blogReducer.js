import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}

export const addLike = (blog, newObject) => {
  return async dispatch => {
    blogService.update(blog.id, newObject)
    dispatch({
      type: 'ADD_LIKE',
      data: { blog, newObject }
    })
  }
}

export const addComment = (blog, commentObject) => {
  return async dispatch => {
    const newComment = await blogService.expand(
      blog.id,
      'comments',
      commentObject
    )
    console.log('bewComment', newComment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { newComment, blog }
    })
  }
}

export const deleteBlog = (blog, user) => {
  return async dispatch => {
    await blogService.remove(blog.id, user.token)
    dispatch({
      type: 'DELETE_BLOG',
      data: { blog }
    })
  }
}

export const addBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'ADD_BLOG',
      data: { newBlog }
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_LIKE':
      return [...state].map(b =>
        b.id === action.data.blog.id ? action.data.newObject : b
      )
    case 'ADD_BLOG':
      return state.concat(action.data.newBlog)
    case 'ADD_COMMENT':
      console.log('add comment state', state)
      console.log('newcomment id', action.data.newComment.id)
      console.log('map state ids', state.map(b => b.id))
      const blogToComment = state
        .find(b => b.id === action.data.blog.id)
        //not sure why concat isnt't working in place of push.
        .comments.push(action.data.newComment)
      return state.map(b => (b.id === blogToComment.id ? blogToComment : b))
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.blog.id)
    default:
      return state
  }
}

export default blogReducer
