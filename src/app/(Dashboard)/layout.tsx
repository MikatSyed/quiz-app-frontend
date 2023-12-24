"use client";
import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import { isLoggedIn, removeUserInfo } from '../../../services/auth.service';
import { authKey } from '@/constants/storageKey';

interface SidebarOptionProps {
  path: string;
  label: string;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ path, label }) => {
  return (
    <Link href={path}>
      <p className={`block py-2 px-4 text-white bg-gray-700`}>
        {label}
      </p>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data } = useLoggedUserQuery(undefined);
  const userData = data?.data;
  console.log(userData);
  const router  = useRouter()
  const userLoggedIn = isLoggedIn();
  console.log(userLoggedIn);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/signin");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if(!isLoading){
    return <p>Loading...</p>
  }

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/signin")
}
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <Link href="/">
            <div className="flex items-center justify-center h-16 bg-gray-900">
              Quiz App
            </div>
          </Link>
          <nav>
            <SidebarOption path="/profile" label="Profile" />
            {userData?.role === 'admin' && (
              <>
                <SidebarOption path="/dashboard/category" label="Category" />
                <SidebarOption path="/dashboard/quiz" label="Quiz" />
              </>
            )}
          </nav>
        </div>
        <div className="mb-4">
          <button
            onClick={logout}
            className="py-2 px-4 text-white bg-red-500 text-center w-full"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {/* Page content goes here */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
