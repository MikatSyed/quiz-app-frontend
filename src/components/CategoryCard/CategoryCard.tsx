import Image from 'next/image';
import React from 'react';
import img from "../../../public/assets/math_icon.6a51555075cdf2ef1306.png"
import Link from 'next/link';

const CategoryCard = (data:any) => {
    const {title,id} = data;
   
  
    return (
     <>
     <Link href={`quiz/${id}`}>
     <div className=" mx-auto bg-white border  shadow-lg rounded-md p-4 text-center">
    <Image
        src={img} // Replace with the actual image URL
        alt={title}
        className="w-20 h-20 object-cover mx-auto rounded-full mb-4"
       layout='responsive'
    />
    <h2 className="text-lg font-bold">{title}</h2>
</div>
     </Link>
     </>
    );
};

export default CategoryCard;