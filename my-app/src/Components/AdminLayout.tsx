"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const dashboardicon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1-1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
        </svg>
    );

    const overviewicon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
        </svg>
    );

    const chaticon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
        </svg>
    );

    const sidebarLinks = [
        { name: "Create a blog", path: "/admin/blog-posts", icon: dashboardicon },
        { name: "Works", path: "/admin/works", icon: overviewicon },
        { name: "Queries", path: "/admin/queries", icon: chaticon },
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "GET",
            });
            if (res.ok) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            router.push("/login");
        }
    };

    const isActive = (path: string) => {
        return pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link href="/">
                    <img className="h-9" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg" alt="dummyLogoColored" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button 
                        onClick={handleLogout}
                        className='border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition-colors'
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex">
                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r h-[calc(100vh-73px)] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
                    {sidebarLinks.map((item, index) => {
                        const active = isActive(item.path);
                        return (
                            <Link 
                                href={item.path} 
                                key={index}
                                className={`flex items-center py-3 px-4 gap-3 
                                    ${active 
                                        ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                        : "hover:bg-gray-100/90 border-white text-gray-700"
                                    }`
                                }
                            >
                                {item.icon}
                                <p className="md:block hidden text-center">{item.name}</p>
                            </Link>
                        );
                    })}
                </div>

                {/* Page Content */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
