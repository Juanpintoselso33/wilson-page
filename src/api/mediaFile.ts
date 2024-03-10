// Asume que baseURL es la URL base de tu API
const baseURL = 'http://127.0.0.1:8000/api' // Ajusta esto a tu configuración

async function fetchMediaFileById(mediaFileId: number) {
  const response = await fetch(`${baseURL}/mediafile/${mediaFileId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // Asegúrate de incluir cualquier header de autenticación si es necesario
    }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
