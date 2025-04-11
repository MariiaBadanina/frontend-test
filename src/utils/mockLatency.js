/**
 * Simulates a delay to mock network latency.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const mockLatency = async (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default mockLatency
