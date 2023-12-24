"use client"
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormInput from "@/components/UI/FormInput/FormInput";
import Form from "@/components/UI/Forms/Form";
import { useUpdateUserMutation, useUserByIdQuery } from "@/redux/api/userApi";

type IDProps = {
    params: any;
  };
  
const EditProfile = ({params}:IDProps) => {
  const {id} = params;
  const{data} = useUserByIdQuery(id)
  const {push} = useRouter();
  const [updateUser] = useUpdateUserMutation();


  const onSubmit = async (values:any) => {
  console.log(values);
 
    try {
        const res = await updateUser({id,body:values}).unwrap()
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
        push("/profile")
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const defaultValues = {
    username: data?.data?.username || "",
    email: data?.data?.email || "",
}
  

  return (
   <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="flex flex-col items-center justify-center">
   
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

      <Form submitHandler={onSubmit} defaultValues={defaultValues} >
      <div className="mb-4">
          <FormInput name="username" label="UserName" size="large"/>
        </div>
        <div className="mb-4">
          <FormInput name="email" label="Email" size="large"/>
        </div>
      

        <button
          type="submit"
          className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full w-full"
        >
          Update
        </button>
      </Form>

    
    </div>
  </div>
   </>
  );
};

export default EditProfile;
