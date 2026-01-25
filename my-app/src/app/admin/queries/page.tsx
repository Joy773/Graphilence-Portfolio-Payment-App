"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Components/AdminLayout';
import { MdDelete, MdEmail, MdPhone, MdBusiness, MdCalendarToday, MdVisibility, MdCheckCircle, MdArchive } from 'react-icons/md';

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    createdAt: string;
    updatedAt: string;
}

const QueriesPage = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchInquiries();
    }, [selectedStatus]);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const url = selectedStatus === 'all' 
                ? '/api/inquiries' 
                : `/api/inquiries?status=${selectedStatus}`;
            
            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setInquiries(result.data);
            } else {
                setError('Failed to load inquiries');
            }
        } catch (err) {
            console.error('Error fetching inquiries:', err);
            setError('An error occurred while loading inquiries');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            setIsUpdating(true);
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const result = await response.json();

            if (result.success) {
                // Refresh inquiries
                fetchInquiries();
                if (selectedInquiry?._id === id) {
                    setSelectedInquiry(result.data);
                }
            } else {
                alert(result.message || 'Failed to update status');
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('An error occurred while updating status');
        } finally {
            setIsUpdating(false);
        }
    };

    const deleteInquiry = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) {
            return;
        }

        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                // Remove from list
                setInquiries(inquiries.filter(inq => inq._id !== id));
                if (selectedInquiry?._id === id) {
                    setSelectedInquiry(null);
                }
            } else {
                alert(result.message || 'Failed to delete inquiry');
            }
        } catch (err) {
            console.error('Error deleting inquiry:', err);
            alert('An error occurred while deleting inquiry');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'read':
                return 'bg-yellow-100 text-yellow-800';
            case 'replied':
                return 'bg-green-100 text-green-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-midnight-monarch mb-2">Inquiries</h1>
                        <p className="text-gray-600">Manage customer queries and messages</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                        </select>
                        <button
                            onClick={fetchInquiries}
                            className="px-4 py-2 bg-midnight-monarch text-white rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading inquiries...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {!loading && !error && inquiries.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">No inquiries found.</p>
                    </div>
                )}

                {!loading && !error && inquiries.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Inquiries List */}
                        <div className="lg:col-span-2 space-y-4">
                            {inquiries.map((inquiry) => (
                                <div
                                    key={inquiry._id}
                                    className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
                                        selectedInquiry?._id === inquiry._id
                                            ? 'border-orange-500'
                                            : 'border-gray-200'
                                    }`}
                                    onClick={() => setSelectedInquiry(inquiry)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-midnight-monarch mb-1">
                                                {inquiry.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">{inquiry.subject}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MdEmail className="w-4 h-4" />
                                                    {inquiry.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MdCalendarToday className="w-4 h-4" />
                                                    {formatDate(inquiry.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                inquiry.status
                                            )}`}
                                        >
                                            {inquiry.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2">
                                        {inquiry.message}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Inquiry Details Sidebar */}
                        <div className="lg:col-span-1">
                            {selectedInquiry ? (
                                <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sticky top-20">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-midnight-monarch">Details</h2>
                                        <button
                                            onClick={() => setSelectedInquiry(null)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Name
                                            </label>
                                            <p className="text-lg font-semibold text-midnight-monarch mt-1">
                                                {selectedInquiry.name}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                                <MdEmail className="w-4 h-4" />
                                                Email
                                            </label>
                                            <a
                                                href={`mailto:${selectedInquiry.email}`}
                                                className="text-lg text-midnight-monarch hover:text-purplish-blue mt-1 block"
                                            >
                                                {selectedInquiry.email}
                                            </a>
                                        </div>

                                        {selectedInquiry.phone && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                                    <MdPhone className="w-4 h-4" />
                                                    Phone
                                                </label>
                                                <a
                                                    href={`tel:${selectedInquiry.phone}`}
                                                    className="text-lg text-midnight-monarch hover:text-purplish-blue mt-1 block"
                                                >
                                                    {selectedInquiry.phone}
                                                </a>
                                            </div>
                                        )}

                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Subject
                                            </label>
                                            <p className="text-lg font-semibold text-midnight-monarch mt-1">
                                                {selectedInquiry.subject}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Message
                                            </label>
                                            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                                                {selectedInquiry.message}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Status
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    value={selectedInquiry.status}
                                                    onChange={(e) => updateStatus(selectedInquiry._id, e.target.value)}
                                                    disabled={isUpdating}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                >
                                                    <option value="new">New</option>
                                                    <option value="read">Read</option>
                                                    <option value="replied">Replied</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Submitted
                                            </label>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {formatDate(selectedInquiry.createdAt)}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200 flex gap-2">
                                            <button
                                                onClick={() => deleteInquiry(selectedInquiry._id)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                            >
                                                <MdDelete className="w-5 h-5" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                                    <p className="text-gray-500">Select an inquiry to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default QueriesPage;
