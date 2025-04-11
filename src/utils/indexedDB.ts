import { openDB, DBSchema, IDBPDatabase } from 'idb'
import { Inspiration, Project } from '../models/schema'

interface MyDB extends DBSchema {
  projects: {
    key: string
    value: Project
  }
  inspirations: {
    key: string
    value: Inspiration
    indexes: { 'by-project': string }
  }
}

const DB_NAME = 'PagePrismDB'
const DB_VERSION = 1

export async function initDB(): Promise<IDBPDatabase<MyDB>> {
  return openDB<MyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('inspirations')) {
        const inspirationStore = db.createObjectStore('inspirations', {
          keyPath: 'id',
        })
        inspirationStore.createIndex('by-project', 'projectId')
      }
    },
  })
}

export async function getDB(): Promise<IDBPDatabase<MyDB>> {
  return initDB()
}
