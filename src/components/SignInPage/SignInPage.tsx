"use client"
import React from "react";
import Form from "../UI/Forms/Form";
import FormInput from "../UI/FormInput/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSigninMutation } from "@/redux/api/authApi";
import { SubmitHandler } from "react-hook-form";
import { storeUserInfo } from "../../../services/auth.service";

type FormValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const {push} = useRouter();
  const [signin] = useSigninMutation()
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await signin({ ...data }).unwrap();
      console.log(res);
      if (res?.token) {
        push("/home");
       
      }
      storeUserInfo({ accessToken: res?.token });
     
    } catch (err: any) {
      console.log(err);
  
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96">
      <h2 className="text-2xl font-semibold mb-6">SignIn</h2>

      <Form submitHandler={onSubmit}>
       
        <div className="mb-4">
          <FormInput name="email" label="Email" />
        </div>
        <div className="mb-4">
          <FormInput name="password" label="Password" type="password" />
        </div>

        <button
          type="submit"
          className="text-sm text-white bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded-full w-full"
        >
          Submit
        </button>
      </Form>

      <Link href="/signup">
        <p className="mt-4 text-sm text-blue-500 hover:underline">
          Don't have an account? Register here
        </p>
      </Link>
    </div>
  </div>
  );
};

export default SignInPage;
