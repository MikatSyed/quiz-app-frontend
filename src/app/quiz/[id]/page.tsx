import QuizPage from '@/components/QuizPage/QuizPage';
import React from 'react';

type IDParams = {
  params: any;
};

const page = ({ params }: IDParams) => {
  const {id} = params;
  return (
    <>
      <QuizPage id={id}/>
    </>
  );
};

export default page;