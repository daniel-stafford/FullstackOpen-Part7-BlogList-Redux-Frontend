import React from 'react'
import { Form, Button, Header } from 'semantic-ui-react'

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
      <Form onSubmit={handleAddBlog}>
        <Header as='h2'>Create new blog</Header>
        <Form.Field>
          <label>title</label>
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Field>
        <label>author</label>

        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Field>
          <label>url</label>
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Field>
        <Button primary type='submit' style={{ marginBottom: '10px' }}>
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
