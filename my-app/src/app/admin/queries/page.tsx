"use client";

import React from 'react';
import AdminLayout from '@/Components/AdminLayout';

const QueriesPage = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Queries</h1>
            <p className="text-gray-600">Manage customer queries and messages here.</p>
        </AdminLayout>
    );
};

export default QueriesPage;
