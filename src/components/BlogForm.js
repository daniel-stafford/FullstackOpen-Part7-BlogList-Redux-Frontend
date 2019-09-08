import React from 'react'

const BlogForm = ({
  handleAddBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl
}) => {
  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <h2>Create new blog</h2>
        <div>
          title
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
