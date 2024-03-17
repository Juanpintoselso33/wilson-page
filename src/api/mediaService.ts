import { MediaItem } from '../types/mediaItem.types'

const API_URL = 'http://127.0.0.1:8000/api/media-items/'

const createMediaItem = async (item: Omit<MediaItem, 'id'>): Promise<MediaItem> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: MediaItem = await response.json();
    console.log('Created MediaItem:', data);
    return data;
  } catch (error) {
    console.error('Error creating media item:', error);
    throw error; // Propagar el error para manejarlo en el componente
  }
};


const fetchMediaItems = async (): Promise<MediaItem[]> => {
  try {
    const response = await fetch(`${API_URL}`) // Asegúrate de que la URL sea correcta
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    // Decode the URLs of media files
    const decodedData = data
      .map((item) => ({
        ...item,
        mediaFiles: item.media_files
          ? item.media_files.map((file) => ({
              ...file,
              file: decodeURIComponent(
                decodeURIComponent(file.file.replace(/^\//, ''))
              )
            }))
          : [] // Handle undefined mediaFiles by defaulting to an empty array
      }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ media_files, ...rest }) => rest)

    console.log('Media items:', decodedData)
    return decodedData
  } catch (error) {
    console.error('Error fetching media items:', error)
    throw error // Propagar el error para manejarlo en el componente
  }
}

const deleteMediaItem = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log(`MediaItem with id ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting media item:', error);
    throw error; // Propagar el error para manejarlo adecuadamente
  }
};

const updateMediaItem = async (id: number, item: Partial<MediaItem>): Promise<MediaItem> => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'PUT', // o 'PATCH' si tu API lo soporta y prefieres actualizar parcialmente
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const updatedItem: MediaItem = await response.json();
    console.log(`MediaItem with id ${id} updated successfully.`);
    return updatedItem;
  } catch (error) {
    console.error('Error updating media item:', error);
    throw error; // Propagar el error para manejarlo adecuadamente
  }
};

const getMediaItem = async (id: number): Promise<MediaItem> => {
  try {
    const response = await fetch(`${API_URL}${id}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: MediaItem = await response.json();
    console.log('Media item:', data);
    return data;
  } catch (error) {
    console.error('Error fetching media item:', error);
    throw error; // Propagar el error para manejarlo en el componente
  }
};

interface UpdateManyResult<T> {
  data: T[];
}

const updateManyMediaItems = async (ids: number[], data: Partial<MediaItem>): Promise<UpdateManyResult<number>> => {
  try {
    const updatedItems = await Promise.all(ids.map((id) => updateMediaItem(id, data)));
    return { data: updatedItems.map((item) => item.id) };
  } catch (error) {
    console.error('Error updating many media items:', error);
    throw error; // Propagar el error para manejarlo adecuadamente
  }
};


// No olvides exportar todas las funciones que necesites
export { fetchMediaItems, createMediaItem, deleteMediaItem, updateMediaItem, getMediaItem, updateManyMediaItems };

