import React from 'react';
import { Admin, Resource } from 'react-admin';
import MyMediaItemList from './AdminComponents/MediaItemList';
import MyMediaItemCreate from './MediaItemCreateForm';
import MyMediaItemEdit from './MediaItemForm';
import Dashboard from './AdminComponents/Dashboard'; // Import your Dashboard component
import { createTheme } from '@mui/material/styles';
import { Layout, defaultTheme, defaultDarkTheme } from 'react-admin';
import MyAppBar from './AdminComponents/AppBar'; // Custom AppBar component
import MySidebar from './AdminComponents/SideBar'; // Custom Sidebar component
// Custom Menu component
import dataProvider from '../dataProvider';

// Define your custom theme

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar}  />;

const AdminPage: React.FC = () => {
  return (
    <Admin
      layout={MyLayout}
      theme={defaultTheme}
      darkTheme={defaultDarkTheme}
      defaultTheme="light"
      dashboard={Dashboard}
      dataProvider={dataProvider}
    >
      <Resource
        name="mediaitems"
        list={MyMediaItemList}
        create={MyMediaItemCreate}
        edit={MyMediaItemEdit}
        // Add icons if needed
      />
      {/* Add more resources as needed */}
    </Admin>
  );
};

export default AdminPage;