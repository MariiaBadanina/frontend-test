import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects, createProject } from '../services/project'
import Button from '../components/Button'
import { fetchTinyLlama } from '../utils/fetchTinyLlama'
import { fetchUnsplashImage } from '../utils/fetchUnsplashImage'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('New Project')
  const [titleErrorMessage, setTitleErrorMessage] = useState(false)
  const [projectDescription, setProjectDescription] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects()
      setProjects(
        allProjects.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      )
    }
    fetchProjects()
  }, [])

  const handleCreateProject = async () => {
    setLoading(true)
    const response = await fetchTinyLlama(
      `Convert "${projectName}" into a short description.`
    )
    setProjectDescription(response)

    const imageUrl = await fetchUnsplashImage(response)
    setImage(imageUrl)

    setLoading(false)
    if (!projectName) {
      setTitleErrorMessage(!projectName.trim())
      return
    }
    const newProject = await createProject({
      name: projectName,
      description: response,
      image: imageUrl,
    })
    setProjects([...projects, newProject])
    setProjectName('')
    setProjectDescription(response)
    setImage(imageUrl)
    setLoading(false)
  }
  return (
    <div>
      <div className="mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Project Title"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setTitleErrorMessage(!projectName.trim())}
            className="mb-4 p-2 border border-gray-300 rounded text-white"
          />
          {titleErrorMessage && (
            <p className="text-red-400 absolute  top-[40px]">
              Title is required
            </p>
          )}
        </div>
      </div>

      <Button onClick={handleCreateProject}>
        {loading ? 'Loading...' : 'Create New Project'}
      </Button>
      {projects.map((project) => (
        <div key={project.id} className="p-4 border-b border-gray-200">
          <Link to={`/projects/${project.id}`} className="block">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <small>{project.id}</small>
            <p className="text-sm text-gray-600">{project.description}</p>
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                style={{ width: '100px', borderRadius: '8px' }}
                className="w-full mt-2 rounded shadow"
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Projects
