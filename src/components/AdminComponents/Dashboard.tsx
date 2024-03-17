import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { useDataProvider, Loading, Error, Button, useRecordContext } from 'react-admin';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';

const UserProfile = ({ userId }) => {
    const dataProvider = useDataProvider();
    const { data, isLoading, error } = useQuery(
        ['users', 'getOne', { id: userId }],
        () => dataProvider.getOne('users', { id: userId })
    );

    if (isLoading) return <Loading />;
    if (error) return <Error />;
    if (!data) return null;

    return (
        <ul>
            <li>Name: {data.data.name}</li>
            <li>Email: {data.data.email}</li>
        </ul>
    );
};

const ApproveButton = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const { mutate, isLoading } = useMutation(
        () => dataProvider.update('comments', { id: record.id, data: { isApproved: true } })
    );

    return <Button label="Approve" onClick={() => mutate()} disabled={isLoading} />;
};

const Dashboard = () => {
    // Example userId, replace with actual logic to obtain userId
    const userId = 1;

    return (
        <CardContent>
            <Title title="Dashboard" />
            <UserProfile userId={userId} />
            <ApproveButton />
        </CardContent>
    );
};

export default Dashboard;