// CategoryTable.js
import { useDeleteCategoryMutation } from '@/redux/api/categoryApi';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryTable = ({ categories }: any) => {
  console.log(categories);
  
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleEdit = (categoryId: string) => {
    // Implement your edit logic here
    console.log(`Edit category with ID: ${categoryId}`);
  };

  const handleDelete = async(categoryId: string) => {
    // Implement your delete logic here
    console.log(categoryId);
   const res =  await deleteCategory(categoryId).unwrap()
   console.log(res);
   toast(res?.message, {
    icon: <span style={{ color: "white" }}>✔</span>,
    style: {
      borderRadius: "10px",
      background: "#82498c",
      color: "#fff",
    },
    duration: 2000,
  });

  };

  return (
  <>
   <Toaster position="top-center" reverseOrder={false} />
   <div className="table-container">
      <table className="bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border-b">Title</th>
            <th className="py-2 px-4 bg-gray-100 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: any) => (
            <tr key={category.id}>
              <td className="py-2 px-4">{category.title}</td>
              <td className="py-2 px-4">
               <Link href={`/dashboard/category/edit/${category.id}`}>
               <button  
                  className="mr-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                  <FaEdit />
                </button>
               </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default CategoryTable;
