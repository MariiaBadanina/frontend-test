import { useState } from 'react'
import { fetchTinyLlama } from '../utils/fetchTinyLlama'
import { fetchUnsplashImage } from '../utils/fetchUnsplashImage'

export const UnsplashDemo = () => {
  const [prompt, setPrompt] = useState('Budget Tracker')
  const [idea, setIdea] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    const response = await fetchTinyLlama(
      `Convert "${prompt}" into a short description.`
    )
    setIdea(response)

    const imageUrl = await fetchUnsplashImage(response)
    setImage(imageUrl)

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, padding: '1rem' }}>
      <h2>✨ LLM + Image Inspiration</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={generate} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Inspiration'}
      </button>

      {idea && (
        <div style={{ marginTop: '1rem' }}>
          <h4>🧠 Idea:</h4>
          <p>{idea}</p>
        </div>
      )}

      {image && (
        <div style={{ marginTop: '1rem' }}>
          <h4>🖼️ Image:</h4>
          <img
            src={image}
            alt="Unsplash result"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  )
}
