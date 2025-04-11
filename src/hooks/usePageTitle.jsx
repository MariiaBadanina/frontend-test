import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const getTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Dashboard'
    case '/projects':
      return 'Projects'
    default:
      return 'Page Prism'
  }
}

const usePageTitle = (title) => {
  const [pageTitle, setPageTitle] = useState(title)
  const location = useLocation()
  useEffect(() => {
    setPageTitle(getTitle(location.pathname))
  }, [location])

  return pageTitle
}

export default usePageTitle
