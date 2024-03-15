import { Edit, SimpleForm, TextInput } from 'react-admin'

const MediaItemEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="category" />
      {/* Añade más campos según sea necesario */}
    </SimpleForm>
  </Edit>
)

export default MediaItemEdit
