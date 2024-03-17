import React, { useState } from 'react';
import { useMedia } from '../contexts/MediaContext';
import { MediaItem } from '../types/mediaItem.types';

const MediaItemCreateForm = () => {
  const { createNewItem, setIsModalOpen } = useMedia();
  const initialState = {
    name: '',
    description: '',
    category: '',
    creator: '',
    previewUrl: '',
    status: 'active',
    publishDate: '',
    mediaFiles: [],
    tags: [],
  };
  const [formState, setFormState] = useState<Omit<MediaItem, 'id' | 'created_at' | 'updated_at'>>(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewItem(formState);
    setIsModalOpen(false); // Cierra el modal y resetea el formulario
    setFormState(initialState); // Resetea el estado del formulario para la próxima creación
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Nombre" required />
      <textarea name="description" value={formState.description} onChange={handleChange} placeholder="Descripción" />
      {/* Continúa con los demás campos según tu modelo de datos */}
      <button type="submit" className="btn">Crear</button>
    </form>
  );
};

export default MediaItemCreateForm;
