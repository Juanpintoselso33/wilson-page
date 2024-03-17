import { fetchMediaItems, createMediaItem, deleteMediaItem, updateMediaItem, getMediaItem, updateManyMediaItems } from './api/mediaService';
import { MediaItem } from './types/mediaItem.types';
import { DataProvider, GetListResult, GetOneResult, CreateResult, UpdateResult, DeleteResult, GetManyResult, GetManyReferenceResult, UpdateManyResult, Identifier, RaRecord } from 'react-admin';

const dataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<GetListResult<RecordType>> => {
    const data = await fetchMediaItems();
    console.log("Data provider", data);
    return { data: data as unknown as RecordType[], total: data.length };
  },
  getOne: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<GetOneResult<RecordType>> => {
    const data = await getMediaItem(params.id);
    return { data: data as unknown as RecordType };
  },
  create: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<CreateResult<RecordType>> => {
    const { data } = params;
    const newData = await createMediaItem(data as Omit<MediaItem, 'id'>); // Asegurando que data no incluya 'id'
    return { data: newData as unknown as RecordType };
  },
  update: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<UpdateResult<RecordType>> => {
    const { id, data } = params;
    const updatedData = await updateMediaItem(id as number, data); // Asegurando que id sea un número
    return { data: updatedData as unknown as RecordType };
  },
  delete: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<DeleteResult<RecordType>> => {
    await deleteMediaItem(params.id as number); // Asegurando que id sea un número
    return { data: params.previousData as RecordType };
  },
  getMany: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<GetManyResult<RecordType>> => {
    const ids = params.ids;
    const data = await Promise.all(ids.map(id => fetchMediaItems(id))); // Modificado para aceptar IDs
    return { data: data.flat() as unknown as RecordType[] }; // Aplanando el array de resultados
  },
  getManyReference: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<GetManyReferenceResult<RecordType>> => {
    const { target, id } = params;
    const data = await fetchMediaItems().then(items => items.filter(item => item[target] === id)); // Asumiendo que fetchMediaItems devuelve todos los items
    return { data: data as unknown as RecordType[] }; // Aplicando la corrección
  },
  updateMany: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<UpdateManyResult<Identifier>> => {
    const { ids, data } = params;
    const updatedData = await updateManyMediaItems(ids, data);
    return { data: updatedData.map(item => item.id) }; // Devolviendo los IDs de los items actualizados
  },
  deleteMany: async <RecordType extends RaRecord = MediaItem>(resource, params): Promise<DeleteResult<Identifier[]>> => {
    const { ids } = params;
    await Promise.all(ids.map(id => deleteMediaItem(id as number))); // Asegurando que id sea un número
    return { data: ids }; // Devolviendo los IDs de los items eliminados
  },
};

export default dataProvider;