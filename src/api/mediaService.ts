const API_URL = 'http://127.0.0.1:8000/api/media-items/'

export const fetchMediaItems = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    // console.error('Error fetching media items:', error)
    throw error
  }
}
