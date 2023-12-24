"use client"
import React from "react";
import toast, { Toaster } from "react-hot-toast";

import FormInput from "@/components/UI/FormInput/FormInput";
import Form from "@/components/UI/Forms/Form";

import { useAddCategoryMutation, useCategoryQuery } from "@/redux/api/categoryApi";
import { useLoggedUserQuery } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";

type IDProps = {
    params: any;
  };
  
const EditCategory = ({params}:IDProps) => {
console.log(params);
    // const {id} = params;
    // const{data} = useCategoryQuery(id);
    // console.log(data);
    const {push} = useRouter();
  
  const [addCategory] = useAddCategoryMutation();

//   const userData = data?.data;
//   console.log(userData?.id);

  const onSubmit = async (values:any) => {
   let data  = {...values};
//    data.createdById = userData?.id;

    try {
        const res = await addCategory(data).unwrap()
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
          setTimeout(() => {
            push("/dashboard/category")
          }, 2000);
     
    } catch (err) {
      console.log(err);
    }
  };


  return (
   <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="">
   
    <div className=" rounded-lg overflow-hidden   w-96">
      <h2 className="text-2xl font-semibold mb-6">Edit Category</h2>

      <Form submitHandler={onSubmit}  >
      <div className="mb-4 flex">
  <div className="mr-2 flex-1">
    <FormInput name="title" label="Title" size="large"  />
  </div>
  
  <button
    type="submit"
    className="text-sm text-white bg-purple-800 hover:bg-purple-900 h-full mt-5"
  >
    Edit
  </button>
</div>
      </Form>

    
    </div>
  </div>
   </>
  );
};

export default EditCategory;
