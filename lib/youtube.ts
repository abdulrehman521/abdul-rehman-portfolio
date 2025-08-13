// YouTube URL validation and conversion utilities
export const validateYouTubeUrl = (url: string): boolean => {
  const youtubeRegex = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]+$/
  return youtubeRegex.test(url)
}

// export const convertToEmbedUrl = (youtubeUrl: string): string => {
//   // Extract video ID from youtu.be URL
//   const match = youtubeUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
//   if (match && match[1]) {
//     return `https://www.youtube.com/embed/${match[1]}`
//   }
//   throw new Error("Invalid YouTube URL format")
// }


export const convertToEmbedUrl = (youtubeUrl: string): string => {
  let videoId: string | null = null

  // Case 1: youtu.be link
  let match = youtubeUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    videoId = match[1]
  }

  // Case 2: youtube.com/shorts link
  if (!videoId) {
    match = youtubeUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
    if (match && match[1]) {
      videoId = match[1]
    }
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  throw new Error("Invalid YouTube URL format")
}

export const getVideoIdFromUrl = (url: string): string | null => {
  let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (match) return match[1]
  match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

// export const getVideoIdFromUrl = (url: string): string | null => {
//   const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
//   return match ? match[1] : null
// }
