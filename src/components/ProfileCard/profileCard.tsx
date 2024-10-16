"use client"
import { FaEdit } from 'react-icons/fa';
import profile from "../../../public/assets/images (2).jpg"
import Image from 'next/image';
import Link from 'next/link';

const ProfileCard = (data:any) => {
   console.log(data);
    const {id,username,email,role,imageUrl} = data;
  return (
  <>
  <Link href={`/profile/edit/${id}`}>
  <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden" key={id}>
    <div className="flex justify-center items-center h-32  p-20 rounded-t-lg">
      <Image src={profile} alt="Profile" height={40} width={100} className="rounded-full" />
    </div>
  
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{username}</h1>
        <FaEdit className="text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>
      
      <p className="text-gray-600 text-sm">{email}</p>
      <p className="text-gray-600 text-sm">{role}</p>
    </div>
  </div>
  </Link>
  </>
  
  );
};

export default ProfileCard;
