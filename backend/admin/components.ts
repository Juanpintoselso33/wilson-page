// ./src/admin/components.ts
import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  MediaFileUpload: componentLoader.add(
    'MediaFileUpload',
    './components/MediaFileUpload'
  )
  // otros componentes personalizados...
}

export { componentLoader, Components }
