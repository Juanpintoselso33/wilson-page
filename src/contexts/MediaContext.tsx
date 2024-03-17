// src/contexts/MediaContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchMediaItems, createMediaItem, updateMediaItem, deleteMediaItem } from '../api/mediaService'; // Asegúrate de tener estas funciones implementadas en tu servicio de API.
import { MediaItem } from '../types/mediaItem.types';

interface MediaContextType {
  mediaItems: MediaItem[];
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMediaItem?: MediaItem;
  setSelectedMediaItem: React.Dispatch<React.SetStateAction<MediaItem | undefined>>;
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
  refreshMediaItems: () => Promise<void>;
  createNewItem: (item: Omit<MediaItem, 'id'>) => Promise<void>;
  updateItem: (item: MediaItem) => Promise<void>;
  deleteItem: (itemId: number) => Promise<void>;
}

const defaultContextValue: MediaContextType = {
  mediaItems: [],
  setMediaItems: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  selectedMediaItem: undefined,
  setSelectedMediaItem: () => {},
  currentFilter: 'all',
  setCurrentFilter: () => {},
  refreshMediaItems: async () => {},
  createNewItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
};

export const MediaContext = createContext<MediaContextType>(defaultContextValue);

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | undefined>();
  const [currentFilter, setCurrentFilter] = useState('all');

  const refreshMediaItems = async () => {
    try {
      const items = await fetchMediaItems();
      setMediaItems(items);
    } catch (error) {
      console.error('Failed to load media items:', error);
    }
  };

  const createNewItem = async (item: Omit<MediaItem, 'id'>) => {
    try {
      await createMediaItem(item);
      await refreshMediaItems();
    } catch (error) {
      console.error('Failed to create new item:', error);
    }
  };

  const updateItem = async (item: MediaItem) => {
    try {
      await updateMediaItem(item);
      await refreshMediaItems();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      await deleteMediaItem(itemId);
      await refreshMediaItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  useEffect(() => {
    refreshMediaItems();
  }, []);

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        setMediaItems,
        isModalOpen,
        setIsModalOpen,
        selectedMediaItem,
        setSelectedMediaItem,
        currentFilter,
        setCurrentFilter,
        refreshMediaItems,
        createNewItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

