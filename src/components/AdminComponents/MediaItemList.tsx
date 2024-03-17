import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

const MediaItemList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="category" />
            <TextField source="creator" />
            <DateField source="publishDate" />
            <BooleanField source="status" />
            {/* Add more fields as needed based on your MediaItem type */}
        </Datagrid>
    </List>
);

export default MediaItemList;

