"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormInput from "@/components/UI/FormInput/FormInput";
import ACCategoryField from "@/components/UI/ACCategoryField/ACCategoryField";
import FormSelectField from "@/components/UI/FormSelectField/FormSelectField";
import { correctAnswerOptions } from "@/constants/constants";
import { useAddQuizMutation } from "@/redux/api/quizApi";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import Form from "@/components/UI/Forms/Form";

const CreateQuiz = () => {
  const { push } = useRouter();
  const { data: categoriesData, isLoading } = useCategoriesQuery(undefined);
  const categoryData = categoriesData?.data;
  const [addQuiz] = useAddQuizMutation();

  const onSubmit = async (values: any) => {
    const formattedData = {
      content: values.content,
      correctOptionId: values.correctOptionId || "A",
      CategoryId: values.CategoryId || categoryData?.[0]?.id,
      options: [
        { content: values.options.content1, type: "A" },
        { content: values.options.content2, type: "B" },
        { content: values.options.content3, type: "C" },
        { content: values.options.content4, type: "D" },
      ],
    };
    const toastId =  toast.loading('Posting..')
    try {
     
      const res = await addQuiz(formattedData).unwrap();
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

      // setTimeout(() => {
      //   push("/dashboard/quiz");
      // }, 2000);
    } catch (err) {
      console.log(err);
    }finally{
      toast.dismiss(toastId)
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96 md:w-full md:max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">Create Quiz</h2>

          {/* Form container that switches to flex layout on medium (md) devices */}
          <Form submitHandler={onSubmit}>
           
              <div className="mb-4">
                <ACCategoryField name="CategoryId" label="Category" />        
            </div>
            <div className="mb-4">
                <FormInput name="content" label="Question" size="large" />
              </div>

            {/* Options inputs arranged in flex layout for md devices */}
            <div className="md:flex md:space-x-4">
              <div className="mb-4 md:mb-0 md:flex-1">
                <FormInput name="options.content1" label="Option A" size="large" />
              </div>
              <div className="mb-4 md:mb-0 md:flex-1">
                <FormInput name="options.content2" label="Option B" size="large" />
              </div>
            </div>

            <div className="md:flex md:space-x-4">
              <div className="mb-4 md:mb-0 md:flex-1">
                <FormInput name="options.content3" label="Option C" size="large" />
              </div>
              <div className="mb-4 md:mb-0 md:flex-1">
                <FormInput name="options.content4" label="Option D" size="large" />
              </div>
            </div>

            <div className="mb-4">
              <FormSelectField
                size="large"
                name="correctOptionId"
                options={correctAnswerOptions}
                label="Correct Answer"
                placeholder="Select"
              />
            </div>

            <button
              type="submit"
              className="text-sm text-white bg-purple-800 hover:bg-purple-900 px-4 py-3 rounded-full w-full"
            >
              Create
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
