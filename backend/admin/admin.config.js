import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import AdminJS from 'adminjs'

import mediaFileResource from './resources/mediafile.resource.js'
import mediaItemResource from './resources/mediaitem.resource.js'

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
})

const adminOptions = {
  resources: [mediaItemResource, mediaFileResource],
  rootPath: '/admin',
  branding: {
    companyName: 'Admin Console',
    logo: false,
    softwareBrothers: false
  }
}

console.log('Loading mediaItemResource:', mediaItemResource)
console.log('Loading mediaFileResource:', mediaFileResource)
console.log('Before creating AdminJS instance')
const admin = new AdminJS(adminOptions)
console.log('After creating AdminJS instance')

const adminConfig = AdminJSExpress.buildRouter(admin)

export default adminConfig
