// admin.router.js

import AdminJSExpress from '@adminjs/express'
import AdminJS from 'adminjs'

import adminJsOptions from './admin/admin.config.js'

const adminJs = new AdminJS(adminJsOptions)
const adminRouter = AdminJSExpress.buildRouter(adminJs)

export default adminRouter
