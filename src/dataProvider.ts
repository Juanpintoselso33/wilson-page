import { useContext } from 'react'
import { GetListResult } from 'react-admin'

import { MediaContext } from './contexts/MediaContext'
import { MediaItem } from './types/mediaItem.types'

const useMediaDataProvider = () => {
  const { mediaItems, setMediaItems } = useContext(MediaContext)

  const getList = async (
    resource,
    params
  ): Promise<GetListResult<MediaItem>> => {
    // Implement fetching logic using MediaContext
    return { data: mediaItems, total: mediaItems.length }
  }

  const getOne = async (resource, params) => {
    /* implementation */
  }
  const getMany = async (resource, params) => {
    /* implementation */
  }
  const getManyReference = async (resource, params) => {
    /* implementation */
  }
  const update = async (resource, params) => {
    /* implementation */
  }
  const updateMany = async (resource, params) => {
    /* implementation */
  }
  const create = async (resource, params) => {
    /* implementation */
  }
  const deleteFunc = async (resource, params) => {
    /* implementation */
  } // 'delete' is a reserved word in JavaScript
  const deleteMany = async (resource, params) => {
    /* implementation */
  }

  return {
    getList,
    getOne,
    getMany,
    getManyReference,
    update,
    updateMany,
    create,
    delete: deleteFunc,
    deleteMany
  }
}

export default useMediaDataProvider
