
import SignUpPage from '@/components/SignUpPage/SignUpPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Quiz  | SignUp",
  };

  
const SignIn = () => {

    return (
        <div>
            <SignUpPage/>
        </div>
    );
};

export default SignIn;