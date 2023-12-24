
import SignInPage from '@/components/SignInPage/SignInPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Quiz  | SignIn",
  };

  
const SignIn = () => {

    return (
        <div>
            <SignInPage/>
        </div>
    );
};

export default SignIn;