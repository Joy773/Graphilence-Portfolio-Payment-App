"use client";

import React from 'react';
import AdminLayout from '@/Components/AdminLayout';

const AdminPage = () => {
    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome to the admin panel! Select a section from the sidebar to get started.</p>
            </div>
        </AdminLayout>
    );
};

export default AdminPage;
