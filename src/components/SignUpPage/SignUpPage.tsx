"use client"
import React from "react";
import Form from "../UI/Forms/Form";
import FormInput from "../UI/FormInput/FormInput";
import Link from "next/link";
import FormSelectField from "../UI/FormSelectField/FormSelectField";
import { roleOptions } from "@/constants/constants";
import { useSignupMutation } from "@/redux/api/authApi";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { error } from "console";

const SignUpPage = () => {
    const {push} = useRouter();
  const [signup] = useSignupMutation()

  const onSubmit = async (values:any) => {
   if(values.role === undefined){
    values.role = "admin"
   }
 
    try {
        const res = await signup(values)
        console.log(res);
        toast("User created successfully", {
            icon: <span style={{ color: "white" }}>✔</span>,
            style: {
              borderRadius: "10px",
              background: "#82498c",
              color: "#fff",
            },
            duration: 2000,
          });

      setTimeout(() => {
        push("/signin")
      }, 2000);
    } catch (err:any) {
      toast.error(err?.data)
    }
  };

  return (
   <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="flex flex-col items-center justify-center h-screen ">
   
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96">
      <h2 className="text-2xl font-semibold mb-6">SignUp</h2>

      <Form submitHandler={onSubmit}>
      <div className="mb-4">
          <FormInput name="username" label="UserName" size="large"/>
        </div>
        <div className="mb-4">
          <FormInput name="email" label="Email" size="large"/>
        </div>
        <div className="mb-4">
          <FormInput name="password" label="Password" type="password" size="large"/>
        </div>

        <div className="mb-4">
         <FormSelectField
                  size="large"
                  name="role"
                  options={roleOptions}
                  label="Role"
                  placeholder="Select"
                />
        </div>


        <button
          type="submit"
          className="text-sm text-white bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-full w-full"
        >
          Submit
        </button>
      </Form>

      <Link href="/signin">
        <p className="mt-4 text-sm text-blue-500 hover:underline">
          Already have an account? SignIn here
        </p>
      </Link>
    </div>
  </div>
   </>
  );
};

export default SignUpPage;
