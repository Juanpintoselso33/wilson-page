import React, { useState, useEffect } from 'react';
import { useMedia } from '../contexts/MediaContext';
import { MediaItem } from '../types/mediaItem.types';

const MediaItemForm = () => {
  const { createNewItem, updateItem, selectedMediaItem, setIsModalOpen } = useMedia();
  const [formState, setFormState] = useState<MediaItem>({
    id: null, // Este valor se ignora en creación y se sobrescribe en edición.
    name: '',
    description: '',
    category: '',
    creator: '',
    previewUrl: '',
    status: '',
    publishDate: '',
    mediaFiles: [], // Puedes manejar esto con un subcomponente o lógica adicional
    created_at: '',
    updated_at: '',
    tags: [],
  });

  useEffect(() => {
    if (selectedMediaItem) {
      setFormState(selectedMediaItem);
    } else {
      // Reset al estado inicial del formulario para creación
      setFormState({
        id: null,
        name: '',
        description: '',
        category: '',
        creator: '',
        previewUrl: '',
        status: '',
        publishDate: '',
        mediaFiles: [],
        created_at: '',
        updated_at: '',
        tags: [],
      });
    }
  }, [selectedMediaItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMediaItem) {
      await updateItem({...formState});
    } else {
      await createNewItem({...formState, id: undefined}); // Asegúrate de remover el ID para la creación
    }
    setIsModalOpen(false);
  };

  // Simplificación, deberías tener campos específicos y manejo para cada tipo de mediaFile
  const handleMediaFilesChange = (mediaFiles) => {
    setFormState((prevState) => ({ ...prevState, mediaFiles }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Nombre" required />
      <textarea name="description" value={formState.description} onChange={handleChange} placeholder="Descripción" />
      {/* Añade inputs para los demás campos según tu UI */}
      <button type="submit" className="btn">
        {selectedMediaItem ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default MediaItemForm;
