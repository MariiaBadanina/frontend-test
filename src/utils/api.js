const BASE_URL = 'https://screenshotof.com'

/**
 * Fetches a screenshot of a website.
 * @param {string} websiteUri - The URI of the website to screenshot.
 * @param {string|null} date - Optional. The date of the screenshot (2024-01 - 2024-10).
 * @param {Object} options - Optional. Additional query parameters for the request.
 * @returns {Promise<string>} A Promise that resolves to the object URL of the screenshot blob.
 * @throws {Error} If there's an HTTP error or other issues during the fetch.
 */
const getScreenshot = async (websiteUri, date = null, options = {}) => {
  const queryParams = new URLSearchParams(options)
  let url = `${BASE_URL}/${websiteUri}`
  if (date) {
    url += `/${date}`
  }
  try {
    const response = await fetch(`${url}?${queryParams}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error getting screenshot:', error)
    throw error
  }
}

/**
 * Fetches metadata for a website screenshot.
 * @param {string} websiteUri - The URI of the website.
 * @param {string|null} date - Optional. The the metadata was captured (2024-01 - 2024-10).
 * @returns {Promise<Object>} A Promise that resolves to the metadata object.
 * @throws {Error} If there's an HTTP error or other issues during the fetch.
 */
const getMetadata = async (websiteUri, date) => {
  try {
    let url = `${BASE_URL}/${websiteUri}`
    if (date) {
      url += `/${date}`
    }
    const response = await fetch(`${url}?f=json`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching metadata:', error)
    throw error
  }
}

export { getScreenshot, getMetadata }
