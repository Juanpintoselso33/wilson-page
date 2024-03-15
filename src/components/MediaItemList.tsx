import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextField,
  UrlField
} from 'react-admin'

const MyMediaItemList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="category" />
      <UrlField source="thumbnailUrl" />
      <EditButton basePath="/mediaitems" />
      <DeleteButton basePath="/mediaitems" />
    </Datagrid>
  </List>
)

export default MyMediaItemList
