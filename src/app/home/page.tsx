"use client"
import Image from 'next/image';
import React from 'react';
import logo from "../../assets/Questions-pana.png"
import Link from 'next/link';



const HomePage = () => {
   
    return (
<div className="text-center max-w-[400px] mx-auto">
    <Image src={logo} alt="Quiz App Image" className="mx-auto mb-4" height={400} width={400} />
    <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
    <p className="text-gray-600 mb-4">Using this app you can check your knowledge in different categories in just a few clicks</p>
   <Link href="/category"> <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
        Start Quiz
    </button></Link>
   
</div>
    );
};

export default HomePage;