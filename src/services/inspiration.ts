import { v4 as uuidv4 } from 'uuid'
import { getDB } from '../utils/indexedDB'
import { Inspiration } from '../models/schema'
import mockLatency from '../utils/mockLatency'

/**
 * Creates a new inspiration entry in the database.
 * @param inspiration - The inspiration object without id, createdAt, and updatedAt fields.
 * @param latencyMs - Optional. The number of milliseconds to simulate latency.
 * @returns A Promise that resolves to the newly created Inspiration object.
 */
export async function createInspiration(
  inspiration: Omit<Inspiration, 'id' | 'createdAt' | 'updatedAt'>,
  latencyMs?: number
): Promise<Inspiration> {
  await mockLatency(latencyMs)
  const db = await getDB()
  const newInspiration: Inspiration = {
    ...inspiration,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  await db.add('inspirations', newInspiration)
  return newInspiration
}

/**
 * Retrieves an inspiration entry from the database by its ID.
 * @param id - The unique identifier of the inspiration.
 * @param latencyMs - Optional. The number of milliseconds to simulate latency.
 * @returns A Promise that resolves to the Inspiration object if found, or undefined if not found.
 */
export async function getInspiration(
  id: string,
  latencyMs?: number
): Promise<Inspiration | undefined> {
  await mockLatency(latencyMs)
  const db = await getDB()
  return db.get('inspirations', id)
}

/**
 * Retrieves all inspiration entries associated with a specific project.
 * @param projectId - The unique identifier of the project.
 * @param latencyMs - Optional. The number of milliseconds to simulate latency.
 * @returns A Promise that resolves to an array of Inspiration objects.
 */
export async function getInspirationsByProject(
  projectId: string,
  latencyMs?: number
): Promise<Inspiration[]> {
  await mockLatency(latencyMs)
  const db = await getDB()
  return db.getAllFromIndex('inspirations', 'by-project', projectId)
}

/**
 * Updates an existing inspiration entry in the database.
 * @param id - The unique identifier of the inspiration to update.
 * @param updates - An object containing the fields to update.
 * @param latencyMs - Optional. The number of milliseconds to simulate latency.
 * @returns A Promise that resolves to the updated Inspiration object.
 * @throws Error if the inspiration is not found.
 */
export async function updateInspiration(
  id: string,
  updates: Partial<Inspiration>,
  latencyMs?: number
): Promise<Inspiration> {
  await mockLatency(latencyMs)
  const db = await getDB()
  const inspiration = await db.get('inspirations', id)
  if (!inspiration) {
    throw new Error('Inspiration not found')
  }
  const updatedInspiration: Inspiration = {
    ...inspiration,
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  await db.put('inspirations', updatedInspiration)
  return updatedInspiration
}

/**
 * Deletes an inspiration entry from the database.
 * @param id - The unique identifier of the inspiration to delete.
 * @param latencyMs - Optional. The number of milliseconds to simulate latency.
 * @returns A Promise that resolves when the deletion is complete.
 */
export async function deleteInspiration(
  id: string,
  latencyMs?: number
): Promise<void> {
  await mockLatency(latencyMs)
  const db = await getDB()
  await db.delete('inspirations', id)
}
