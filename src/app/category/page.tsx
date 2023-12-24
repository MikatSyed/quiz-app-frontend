
"use client"
import Link from 'next/link';
import Image from 'next/image';
import quiz from "../../assets/Business Plan-amico.png";
import category from "../../assets/Webinar-cuate.png";
import { useCategoriesQuery } from '@/redux/api/categoryApi';
import Navbar from '@/components/Navbar/Navbar';

const CategoryPage = () => {
  const { data } = useCategoriesQuery(undefined);
  const categoryData = data?.data;

  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto mb-10">
         <div className="mb-4">
        <Image
          src={quiz} // Replace with the actual image URL
          alt="category image"
          height={420}
          width={420}
          className="object-cover mx-auto"
        />
      </div>
      <h2 className="text-3xl font-semibold text-center mb-4">Choose Quiz Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {categoryData?.map((item: any, index: number) => (
          <Link href={`quiz/${item?.id}`} key={item.id}>
            <p className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg flex flex-col items-center">
              <div className="mt-2 mb-2 flex items-center justify-center">
                <Image
                  src={category} // Replace with the actual image URL
                  alt="image"
                  height={80}
                  width={80}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-md font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </p>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default CategoryPage;