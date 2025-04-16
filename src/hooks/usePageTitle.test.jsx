import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import usePageTitle from './usePageTitle'

jest.mock('../services/project', () => ({
  getProject: (id) => {
    if (id === 'test-project') {
      return { name: 'Test Project' }
    }
  },
}))

const TestComponent = () => {
  const title = usePageTitle()
  return <div>{title}</div>
}

const renderTestComponent = (initialEntries) =>
  render(<TestComponent />, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          {/* This Route gives the hook access to the `:id` param during testing */}
          <Route exact path="/projects/:id" element={children} />
          <Route path="*" element={children} />
        </Routes>
      </MemoryRouter>
    ),
  })

describe('usePageTitle', () => {
  it('returns Page Prism when the url is unknown', () => {
    renderTestComponent(['/unknown'])
    expect(screen.getByText('Page Prism')).toBeInTheDocument()
  })

  it('returns Dashboard when at the root', () => {
    renderTestComponent(['/'])
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('returns Projects when at the projects root', () => {
    renderTestComponent(['/projects'])
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('returns the project name when a matching project is found', async () => {
    renderTestComponent(['/projects/test-project'])
    // The waitFor is needed to give the hook time to finish fetching the mocked project
    await waitFor(() => expect(screen.getByText('Test Project')).toBeInTheDocument())
  })

  it('returns the title of the latest history entry (current page), not previous entries', () => {
    renderTestComponent(['/unknown', '/', '/projects'])
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })
})
