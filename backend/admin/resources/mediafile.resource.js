import MediaFileModel from '../../models/MediaFile.js'
import MediaFileUpload from '../components/MediaFileUpload.js'

console.log('Loading mediaFileResource')

const mediaFileResource = {
  resource: MediaFileModel,
  options: {
    properties: {
      fileUrl: {
        components: {
          edit: MediaFileUpload
        }
      }
    }
  }
}

export default mediaFileResource
