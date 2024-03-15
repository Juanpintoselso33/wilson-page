import { Create, SimpleForm, TextInput } from 'react-admin'

const MediaItemCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="category" />
      {/* Añade más campos según sea necesario */}
    </SimpleForm>
  </Create>
)

export default MediaItemCreate
