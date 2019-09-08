import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'A person',
    likes: 5
  }

  const component = render(<SimpleBlog blog={blog} />)

  const expandedDiv = component.container.querySelector('.expandedBlog')
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(expandedDiv).toHaveTextContent(blog.likes)
})
test('clicking the button calls event handler', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'A person',
    likes: 5
  }

  const mockHandler = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})
