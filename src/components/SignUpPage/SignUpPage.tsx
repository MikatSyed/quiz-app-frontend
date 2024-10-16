"use client"
import React, { useState } from "react";
import Form from "../UI/Forms/Form";
import FormInput from "../UI/FormInput/FormInput";
import Link from "next/link";
import { useSignupMutation } from "@/redux/api/authApi";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "@/schemas/signup";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignUpPage = () => {
  const {push} = useRouter();
  const [signup] = useSignupMutation()
  const [showPassword, setShowPassword] = useState(false); 

  const onSubmit = async (values:any) => {
    values.role = "performer"
    try {
        const res = await signup(values)
        console.log(res);
        toast("Register successfully", {
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

      <Form submitHandler={onSubmit} resolver={yupResolver(signUpSchema)}>
      <div className="mb-4">
          <FormInput name="username" label="Name" size="large"/>
        </div>
        <div className="mb-4">
          <FormInput name="email" label="Email" size="large"/>
        </div>
        <div className="mb-4 relative"> 
              <FormInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute left-64 top-7 text-gray-600" 
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <HiEyeOff className="w-4 h-4" /> 
                ) : (
                  <HiEye className="w-4 h-4" /> 
                )}
              </button>
            </div>

      

        <button
          type="submit"
          className="text-sm text-white bg-purple-800 hover:bg-purple-900 px-4 py-4 rounded-full w-full"
        >
          Sign Up
        </button>
      </Form>

      
        <p className="mt-4 text-sm ">
          Already have an account? <Link href="/signin"><span className="text-blue-500 hover:underline">Signin here</span></Link>
        </p>
     
    </div>
  </div>
   </>
  );
};

export default SignUpPage;
