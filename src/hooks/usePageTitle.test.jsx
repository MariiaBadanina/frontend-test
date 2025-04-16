import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import usePageTitle from './usePageTitle'

// Mock getProject service
jest.mock('../services/project', () => ({
  getProject: jest.fn(),
}))

import { getProject } from '../services/project'

// Test component that uses the hook
const TestComponent = () => {
  const pageTitle = usePageTitle()
  return <h1>{pageTitle}</h1>
}

describe('usePageTitle', () => {
  it('should return', async () => {
    // Arrange: mock return value of getProject
    getProject.mockResolvedValue({ name: 'Test Project Title' })

    // Render with route that includes `id`
    render(
      <MemoryRouter initialEntries={['/projects/123']}>
        <Routes>
          <Route path="/projects/:id" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    )

    // Assert: wait until mock title appears
    await waitFor(() => {
      expect(screen.getByRole('heading')).toHaveTextContent(
        'Test Project Title'
      )
    })
  })
})
