"use client"
import React from "react";
import toast, { Toaster } from "react-hot-toast";

import FormInput from "@/components/UI/FormInput/FormInput";
import Form from "@/components/UI/Forms/Form";

import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { useLoggedUserQuery } from "@/redux/api/userApi";


const AddCategory = () => {

 
  
  const [addCategory] = useAddCategoryMutation();
  const { data } = useLoggedUserQuery(undefined);
  const userData = data?.data;
  console.log(userData?.id);

  const onSubmit = async (values:any) => {
   let data  = {...values};
   data.createdById = userData?.id;
   const toastId =  toast.loading('Posting..')
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

     
    } catch (err) {
      console.log(err);
    }finally{
      toast.dismiss(toastId)
    }
  };


  return (
   <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="">
   
    <div className=" rounded-lg overflow-hidden   w-96">
      <h2 className="text-2xl font-semibold mb-6">Add Category</h2>

      <Form submitHandler={onSubmit}  >
      <div className="mb-4 flex">
  <div className="mr-2 flex-1">
    <FormInput name="title" label="Title" size="large"  />
  </div>
  
  <button
    type="submit"
    className="text-sm text-white bg-purple-800 hover:bg-purple-900 h-full mt-5"
  >
    Add
  </button>
</div>
      </Form>

    
    </div>
  </div>
   </>
  );
};

export default AddCategory;
