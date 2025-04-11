/**
 * Project
 */
interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  inspirations: Inspiration[]
}

/**
 * Inspiration object
 */
interface Inspiration {
  id: string
  projectId: string
  websiteMetadata: WebsiteMetadata
  screenshot_uri: string
  notes: string
  createdAt: string
  updatedAt: string
}

/**
 * Website metadata
 * This is what is returned from the screenshotof api with the ?f=json flag
 */
interface WebsiteMetadata {
  url: string
  title: string | null
  description: string | null
  favicon: string | null
  author: string | null
  date: string | null
  image: string | null
  logo: string | null
  publisher: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: OgImage[]
  ogLocale: string | null
  ogUrl: string | null
  charset: string | null
  urlRequested: string
  urlResolved: string
}

interface OgImage {
  url: string
  type: string
}

export type { Project, Inspiration, WebsiteMetadata, OgImage }
