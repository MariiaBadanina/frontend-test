import { jest } from '@jest/globals'
import mockLatency from './mockLatency'

describe('mockLatency', () => {
  test('delays execution for the specified time', async () => {
    const startTime = Date.now()
    await mockLatency(100)
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    expect(elapsedTime).toBeGreaterThanOrEqual(100)
    expect(elapsedTime).toBeLessThan(150)
  })

  test('uses default delay of 0ms when no argument is provided', async () => {
    const startTime = Date.now()
    await mockLatency()
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    expect(elapsedTime).toBeLessThan(50)
  })

  test('resolves the promise after the delay', async () => {
    const mockCallback = jest.fn()
    const promise = mockLatency(50).then(mockCallback)
    expect(mockCallback).not.toHaveBeenCalled()
    await promise
    expect(mockCallback).toHaveBeenCalled()
  })
})
