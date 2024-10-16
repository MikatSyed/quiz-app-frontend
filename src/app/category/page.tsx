"use client"
import Link from 'next/link';
import Image from 'next/image';
import category from "../../../public/assets/Webinar-cuate.png";
import { useCategoriesQuery } from '@/redux/api/categoryApi';
import Navbar from '@/components/Navbar/Navbar';

const CategoryPage = () => {
  const { data } = useCategoriesQuery(undefined);
  const categoryData = data?.data;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 tracking-wide">
          Choose Your <span className="text-purple-800">Quiz Category</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {categoryData?.map((item: any) => (
            <Link href={`quiz/${item?.id}`} key={item.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-6 transform hover:scale-105 hover:bg-gradient-to-br from-purple-800 to-indigo-600">
                <div className="bg-gradient-to-tr from-purple-600 to-purple-400 p-4 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={category}
                    alt="category image"
                    height={80}
                    width={80}
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-100">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
