import React from 'react'
import { render, waitForElement, cleanup } from '@testing-library/react'
import App from './App'

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    expect(component.container.querySelector('.blog')).toBeNull()
  })
})
