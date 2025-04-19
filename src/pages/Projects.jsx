import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects, createProject } from '../services/project'
import Button from '../components/Button'
import { UnsplashDemo } from '../components/UnsplashDemo'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState(false)
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects()
      setProjects(allProjects)
    }
    fetchProjects()
  }, [])

  const handleCreateProject = async () => {
    if (!projectName || !projectDescription) {
      setTitleErrorMessage(!projectName.trim())
      setDescriptionErrorMessage(!projectDescription.trim())
      return
    }
    const newProject = await createProject({
      name: projectName,
      description: projectDescription,
    })
    setProjects([...projects, newProject])
    setProjectName('')
    setProjectDescription('')
  }

  return (
    <div>
      <div className="flex mb-10">
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
        <div className="relative">
          <input
            type="text"
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onBlur={() =>
              setDescriptionErrorMessage(!projectDescription.trim())
            }
            className="mb-4 p-2 border border-gray-300 rounded text-white"
          />
          {descriptionErrorMessage && (
            <p className="text-red-400 absolute  top-[40px]">
              Description is required
            </p>
          )}
        </div>
      </div>
      <Button onClick={handleCreateProject}>Create New Project</Button>
      {projects.map((project) => (
        <div key={project.id} className="p-4 border-b border-gray-200">
          <Link to={`/projects/${project.id}`} className="block">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <small>{project.id}</small>
            <p className="text-sm text-gray-600">{project.description}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Projects
