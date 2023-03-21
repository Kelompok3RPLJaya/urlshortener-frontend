import React from "react";
import { UseFormRegister } from "react-hook-form";
import FormValues from "@/constant/Type";

interface InputProps {
  type: string;
  label: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}

const TextInput = ({ type, label, name, register, error }: InputProps) => {
  return (
    <>
      <input
        type={type}
        {...register(name)}
        placeholder={label}
        className="px-6 py-3 border rounded-3xl"
      />
      <p className="text-sm text-red-600 pl-4 box-border">{error}</p>
    </>
  );
};

export default TextInput;
