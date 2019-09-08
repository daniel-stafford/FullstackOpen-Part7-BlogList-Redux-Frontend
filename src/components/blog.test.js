import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

afterEach(cleanup)

describe('<Blog/>', () => {
  let component
  const mockHandler = jest.fn()
  const blog = {
    likes: 8,
    title: 'Stuff about stuff',
    author: 'Johnny',
    url: 'www.stuff.com',
    user: {
      username: 'dstafford',
      name: 'Daniel Stafford',
      id: '5d6933bed2b41c742240fa67'
    },
    id: '5d6d0c01dda6a862eaa2d3da'
  }
  const user = {
    blogs: [],
    username: 'fsmith',
    name: 'Frank Smith',
    id: '5d6933f5d2b41c742240fa68'
  }
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleRemove={mockHandler}
        user={user}
      />
    )
  })
  afterEach(cleanup)

  test('blog is not expanded at start but expands after getting clicked', () => {
    const wholeBlog = component.container.querySelector('.wholeBlog')
    let extraContent = component.container.querySelector('.extraContent')
    expect(extraContent).toBeNull()
    fireEvent.click(wholeBlog)
    extraContent = component.container.querySelector('.extraContent')
    expect(extraContent).not.toBeNull()
  })
})
