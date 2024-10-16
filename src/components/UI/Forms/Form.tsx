"use client";
import {
  useForm,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { ReactElement, ReactNode, useEffect } from "react";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
  title?: string;
  content?: string;
  options?: {
    content1?: string;
    content2?: string;
    content3?: string;
    content4?: string;
  };
  CategoryId?:string;
  correctOptionId?:string;


} & FormConfig;

const Form = ({ children, submitHandler, defaultValues,resolver }: FormProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm<FormProps>(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = (data:any) => {
    submitHandler(data);
    reset({
      title:"",
      content:"",
      options: {
        content1: "",
        content2: "",
        content3: "",
        content4: "",
      },
      correctOptionId:"",
      CategoryId:""
    });
  }
  useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
