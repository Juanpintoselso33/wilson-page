// src/components/MediaItemList.tsx
import React, { useContext } from 'react';
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MediaContext } from '../contexts/MediaContext';

export const MediaItemList = () => {
  const { mediaItems } = useContext(MediaContext);

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", type: "number" },
      { field: "name", flex: 1, headerName: "Name" },
      { field: "description", flex: 1, headerName: "Description" },
      { field: "category", flex: 1, headerName: "Category" },
      { field: "creator", flex: 1, headerName: "Creator" },
      { field: "previewUrl", flex: 1, headerName: "Preview URL" },
      { field: "status", flex: 1, headerName: "Status" },
      { field: "publishDate", flex: 1, headerName: "Publish Date", renderCell: (params) => <DateField value={params.value} /> },
      { field: "created_at", flex: 1, headerName: "Created At", renderCell: (params) => <DateField value={params.value} /> },
      { field: "updated_at", flex: 1, headerName: "Updated At", renderCell: (params) => <DateField value={params.value} /> },
      { field: "tags", flex: 1, headerName: "Tags", renderCell: (params) => params.value ? params.value.join(", ") : "" },
      { 
        field: "mediaFiles", 
        headerName: "Media Files", 
        flex: 1, 
        renderCell: (params) => `${params.value.length} files` 
      },
    ],
    [mediaItems],
  );

  return (
    <List>
      <DataGrid rows={mediaItems} columns={columns} autoHeight />
    </List>
  );
};

export default MediaItemList;
