export const fetchTinyLlama = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tinyllama',
        prompt,
        stream: false,
      }),
    })

    const result = await response.json()
    return result.response
  } catch (error) {
    console.error('TinyLlama failed:', error)
    return 'Oops! Something went wrong with TinyLlama.'
  }
}
