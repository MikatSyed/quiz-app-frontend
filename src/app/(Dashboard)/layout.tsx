"use client";
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import { isLoggedIn, removeUserInfo } from '../../../services/auth.service';
import { authKey } from '@/constants/storageKey';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; 

interface SidebarOptionProps {
  path: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ path, label, isActive, onClick }) => {
  return (
    <Link href={path} onClick={onClick}>
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
  const { push } = useRouter();
  const { data } = useLoggedUserQuery(undefined);
  const userData = data?.data;
  const pathname = usePathname(); 
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); 

  useEffect(() => {
    if (!userLoggedIn) {
      push("/signin");
    } else {
      setIsLoading(false);
    }
  }, [userLoggedIn]);

  const logout = () => {
    removeUserInfo(authKey);
    window.location.href = "/signin";
  };

  const handleSidebarOptionClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Close sidebar on small screens
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100 main">
      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white flex flex-col justify-between w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div>
          <Link href="/category">
            <div className="flex items-center justify-center h-16 bg-gray-900 text-lg font-bold">
              Quizzyfy
            </div>
          </Link>
          <nav>
            <SidebarOption path="/profile" label="Profile" isActive={pathname === "/profile"} onClick={handleSidebarOptionClick} />
            {userData?.role === 'admin' && (
              <>
                <SidebarOption path="/dashboard/category" label="Category" isActive={pathname === "/dashboard/category"} onClick={handleSidebarOptionClick} />
                <SidebarOption path="/dashboard/quiz" label="Quiz" isActive={pathname === "/dashboard/quiz"} onClick={handleSidebarOptionClick} />
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

      {/* Sidebar Toggle Button */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg">
        {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-margin duration-300 ${isSidebarOpen ? '' : 'ml-0'}`}>
        <header className="h-16 bg-white shadow">
          <div className="flex items-center justify-between px-4">
            {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
