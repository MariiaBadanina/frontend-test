import { useState } from 'react'
import { fetchTinyLlama } from '../utils/fetchTinyLlama' // adjust path if needed
import styles from './TinyLlamaDemo.module.css'

export const TinyLlamaDemo = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    const result = await fetchTinyLlama(prompt)
    setResponse(result)
    setLoading(false)
  }

  return (
    <div style={{ paddingBottom: '1rem', maxWidth: 600 }}>
      <h2 className={styles.title}>🦙 TinyLlama Prompt Tester</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className={styles.textarea}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Asking TinyLlama...' : 'Generate Response'}
      </button>
      {response && (
        <div className={styles.responseContainer}>
          <h3 className={styles.title}>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
