import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getProject } from '../services/project'

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
  const { id } = useParams()
  // const path = location.pathname
  // const pathArray = path.split('/')
  // const id = pathArray[pathArray.length - 1]

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      try {
        const projectData = await getProject(id)
        if (projectData?.name) {
          setPageTitle(projectData.name)
        }
      } catch (e) {
        console.error('Failed to load project', e)
      }
    }

    fetchProject()
    setPageTitle(getTitle(location.pathname))
  }, [location])

  return pageTitle
}

export default usePageTitle
