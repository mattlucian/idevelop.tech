import { onUnmounted } from 'vue'

export interface MetaOptions {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image'
}

/**
 * Composable for managing document meta tags
 * Updates title, description, Open Graph, and Twitter Card tags
 */
export function useMeta(options: MetaOptions) {
  const originalTitle = document.title
  const createdTags: HTMLMetaElement[] = []

  // Helper to set or update a meta tag
  const setMetaTag = (name: string, content: string, useProperty = false) => {
    const attribute = useProperty ? 'property' : 'name'
    let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement

    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attribute, name)
      document.head.appendChild(tag)
      createdTags.push(tag)
    }

    tag.setAttribute('content', content)
  }

  // Update document title
  if (options.title) {
    document.title = options.title
  }

  // Update description
  if (options.description) {
    setMetaTag('description', options.description)
  }

  // Update Open Graph tags
  if (options.ogTitle) {
    setMetaTag('og:title', options.ogTitle, true)
  }

  if (options.ogDescription) {
    setMetaTag('og:description', options.ogDescription, true)
  }

  if (options.ogImage) {
    setMetaTag('og:image', options.ogImage, true)
  }

  if (options.ogUrl) {
    setMetaTag('og:url', options.ogUrl, true)
  }

  // Always set og:type for pages
  setMetaTag('og:type', 'website', true)

  // Update Twitter Card tags
  const twitterCard = options.twitterCard || 'summary_large_image'
  setMetaTag('twitter:card', twitterCard)

  if (options.ogTitle) {
    setMetaTag('twitter:title', options.ogTitle)
  }

  if (options.ogDescription) {
    setMetaTag('twitter:description', options.ogDescription)
  }

  if (options.ogImage) {
    setMetaTag('twitter:image', options.ogImage)
  }

  // Cleanup on unmount: restore original title and remove created tags
  onUnmounted(() => {
    document.title = originalTitle
    createdTags.forEach((tag) => tag.remove())
  })
}
