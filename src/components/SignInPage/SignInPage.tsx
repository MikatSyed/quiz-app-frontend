"use client";
import React, { useState } from "react";
import Form from "../UI/Forms/Form";
import FormInput from "../UI/FormInput/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSigninMutation } from "@/redux/api/authApi";
import { SubmitHandler } from "react-hook-form";
import { storeUserInfo } from "../../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/schemas/login";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import icons from react-icons

type FormValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const { push } = useRouter();
  const [signin] = useSigninMutation();
  const [showPassword, setShowPassword] = useState(false); 


  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await signin({ ...data }).unwrap();

      if (res?.token) {
        storeUserInfo({ accessToken: res?.token });
        push("/home");
      }
    } catch (err: any) {
      console.log(err, '31');
      toast.error(err?.data);
    }
  };

  // Handle admin login
  const handleAdminLogin = async () => {
    const adminCredentials = {
      email: "mikat@gmail.com",
      password: "mikat123",
    };

    try {
      const res = await signin(adminCredentials).unwrap();

      if (res?.token) {
        storeUserInfo({ accessToken: res?.token });
        push("/profile");
      }
    } catch (err: any) {
      console.log(err, '41');
      toast.error(err?.data);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96">
          <div className="flex justify-center py-6">
            <h1 className="text-4xl font-semibold">
              <span className="text-purple-900">Quiz</span> App
            </h1>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div className="mb-4">
              <FormInput name="email" label="Email" />
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
              className="text-sm text-white bg-purple-800 hover:bg-purple-900 px-4 py-4 rounded-full w-full transition duration-300"
            >
              Login
            </button>
          </Form>

          <div className="mt-4">
            <button
              onClick={handleAdminLogin}
              className="text-sm text-white bg-purple-800 hover:bg-purple-900 px-4 py-4 rounded-full w-full transition duration-300"
            >
              Login as Admin
            </button>
          </div>

          <p className="mt-4 text-sm">
            Don't have an account? <span className="text-blue-500 hover:underline"><Link href="/signup"> Register here</Link></span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
