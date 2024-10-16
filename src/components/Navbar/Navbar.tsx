"use client";
import Image from "next/image";
import profile from "../../../public/assets/images (2).jpg"
import { useLoggedUserQuery } from "@/redux/api/userApi";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi"; 
import Logo from '../../../public/assets/Logo.png'

const Navbar = () => {
  const { data } = useLoggedUserQuery(undefined);
  const userData = data?.data;
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-purple-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Name */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            QuizApp
          </Link>
        </div>

        {/* Middle - Links */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/category" className="text-white hover:text-gray-300 transition-colors">
            Category
          </Link>
          <Link href="/leaderboard" className="text-white hover:text-gray-300 transition-colors">
            Leaderboard
          </Link>
       
        </nav>

        {/* Right side - User Profile */}
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <div className="flex items-center space-x-2">
              <Image
                src={profile}
                alt="Profile"
                height={40}
                width={40}
                className="rounded-full"
              />
              <span className="hidden md:block text-white font-medium">
                {userData?.username || "Guest"}
              </span>
            </div>
          </Link>

          {/* Hamburger Menu for mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-800 text-white py-2">
          <div className="flex flex-col space-y-4 text-center">
            <Link href="/category" className="hover:text-gray-300 transition-colors" onClick={toggleMenu}>
              Category
            </Link>
            <Link href="/leaderboard" className="hover:text-gray-300 transition-colors" onClick={toggleMenu}>
              Leaderboard
            </Link>
          
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
