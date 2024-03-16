import React from 'react'
import { Admin, Resource } from 'react-admin'

import useMediaDataProvider from '../dataProvider'
import MyMediaItemCreate from './MediaItemCreate'
import MyMediaItemEdit from './MediaItemEdit'
import MyMediaItemList from './MediaItemList'

const AdminPage: React.FC = () => {
  const dataProvider = useMediaDataProvider()

  return (
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
}

export default AdminPage
