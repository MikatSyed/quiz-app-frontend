"use client"
import Image from "next/image";
import profile from "../../assets/images (2).jpg"
import { useLoggedUserQuery } from "@/redux/api/userApi";
import Link from "next/link";

const Navbar = () => {
    const { data } = useLoggedUserQuery(undefined);
    const userData = data?.data;

    return (
        <div>
            <div className="bg-purple-900 p-4 flex items-center justify-between">
  {/* Left side - Name */}
  <div className="text-white text-lg font-semibold">Your Name</div>

  {/* Middle - Category, Leaderboard, Menu Options */}
  <div className="flex items-center space-x-4">
    <a href="#" className="text-white hover:text-gray-300">Category</a>
    <a href="#" className="text-white hover:text-gray-300">Leaderboard</a>
    <a href="#" className="text-white hover:text-gray-300">Menu Option</a>
  </div>

  {/* Right side - Rounded Login Image */}
<Link href="/profile">
<div className="flex items-center space-x-2">
  
  <Image
    src={profile}
    alt="Login"
   height={30}
   width={30}
   className="rounded-full"
  />
  <span className="text-white">{userData?.username}</span>
</div>
</Link>
</div>

        </div>
    );
};

export default Navbar;