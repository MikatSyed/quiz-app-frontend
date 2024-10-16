"use client";
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Updated import
import { useLoggedUserQuery } from '@/redux/api/userApi';
import { isLoggedIn, removeUserInfo } from '../../../services/auth.service';
import { authKey } from '@/constants/storageKey';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; 

interface SidebarOptionProps {
  path: string;
  label: string;
  isActive?: boolean;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ path, label, isActive }) => {
  return (
    <Link href={path}>
      <p className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${isActive ? 'bg-purple-600' : 'hover:bg-purple-700'} text-white`}>
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
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // State to manage sidebar visibility

  useEffect(() => {
    if (!userLoggedIn) {
      // Navigate to the sign-in page if the user is not logged in
      window.location.href = "/signin"; // Use window.location.href for redirection
    } else {
      setIsLoading(false); // Set loading to false after checking user login status
    }
  }, [userLoggedIn]);

  const logout = () => {
    removeUserInfo(authKey);
    window.location.href = "/signin"; // Use window.location.href for redirection
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white flex flex-col justify-between w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div>
          <Link href="/category">
            <div className="flex items-center justify-center h-16 bg-gray-900 text-lg font-bold">
              Quiz App
            </div>
          </Link>
          <nav>
            <SidebarOption path="/profile" label="Profile" isActive={pathname === "/profile"} />
            {userData?.role === 'admin' && (
              <>
                <SidebarOption path="/dashboard/category" label="Category" isActive={pathname === "/dashboard/category"} />
                <SidebarOption path="/dashboard/quiz" label="Quiz" isActive={pathname === "/dashboard/quiz"} />
              </>
            )}
          </nav>
        </div>
        <div className="mb-4 mx-4">
          <button
            onClick={logout}
            className="py-2 px-4 text-white bg-red-500 text-center w-full rounded-lg transition-colors duration-200 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Toggle Button for Small Screens */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg">
        {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="h-16 bg-white shadow">
          <div className="flex items-center justify-between px-4">
            {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
