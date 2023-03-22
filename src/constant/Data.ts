import FormValues from "./Type";

export interface InputField {
  type: string;
  label: string;
  name: keyof FormValues;
  error?: string;
}

export const FormDataRegister: InputField[] = [
  {
    type: "text",
    label: "username",
    name: "name",
  },
  {
    type: "email",
    label: "email",
    name: "email",
  },
  {
    type: "password",
    label: "password",
    name: "password",
  },
];

export const FormDataLogin: InputField[] = [
  {
    type: "email",
    label: "email",
    name: "email",
  },
  {
    type: "password",
    label: "password",
    name: "password",
  },
];
