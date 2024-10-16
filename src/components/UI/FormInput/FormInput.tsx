"use client"
import React from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../../utils/schema-validator";

interface FormInputProps {
  name: string;
  type?: string;
  size?: number | undefined | string; // Updated type to allow number, string, or undefined
  value?: string;
  id?: string;
  placeholder?: string;
  validation?: any; // Add your specific validation type here
  label?: string;
  customStyle?: React.CSSProperties;
}
const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  customStyle,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
           
            placeholder={placeholder}
            style={customStyle}
            {...field}
            value={value ? value : field.value}
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300
                       transition duration-300 ease-in-out
                       hover:border-blue-500 focus:border-blue-500"
          />
        )}
      />
      {errorMessage && (
        <small className="text-red-500 mt-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default FormInput;
