export const fetchUnsplashImage = async (
  query: string
): Promise<string | null> => {
  const accessKey = import.meta.env.VITE_UNSPLASH_KEY // 🗝️ Unsplash Access Key

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    )

    const data = await response.json()
    return data.results[0]?.urls?.regular || null
  } catch (error) {
    console.error('Unsplash fetch failed:', error)
    return null
  }
}
