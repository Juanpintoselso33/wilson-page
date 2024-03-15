import jsonServerProvider from 'ra-data-json-server'
import { Admin, Resource } from 'react-admin'

import MyMediaItemCreate from './MediaItemCreate' // Componente para crear MediaItems
import MyMediaItemEdit from './MediaItemEdit' // Componente para editar MediaItems
import MyMediaItemList from './MediaItemList' // Componente para listar MediaItems

const dataProvider = jsonServerProvider('http://path.to.my.api/')

const AdminPage: React.FC = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="mediaitems"
      list={MyMediaItemList}
      create={MyMediaItemCreate}
      edit={MyMediaItemEdit}
    />
    {/* Configura más recursos según sea necesario */}
  </Admin>
)

export default AdminPage
