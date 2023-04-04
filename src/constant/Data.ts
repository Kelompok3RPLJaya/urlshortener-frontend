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
];

export const LinkProps = [
  {
    id: 1,
    date: "21 March 2023",
    user: "Renka Nawasena",
    title: "Open recruitment RPL laboratory administrator",
    short_url: "shortify.zoomOprecAdmin",
    long_url: "https://docs.github.com/en/pull-requests/testing1",
  },
  {
    id: 2,
    date: "14 June 2023",
    user: "Testing Satu",
    title: "Testing link shortener shortify pertama",
    short_url: "shortify.testingSatu",
    long_url: "https://docs.github.com/en/pull-requests/testing2",
  },
  {
    id: 3,
    date: "29 August 2023",
    user: "Testing Dua",
    title: "Testing link shortener shortify kedua",
    short_url: "shortify.testingDua",
    long_url: "https://docs.github.com/en/pull-requests/testing3",
  },
  {
    id: 4,
    date: "3 November 2023",
    user: "Testing Tiga",
    title: "Testing link shortener shortify ketiga",
    short_url: "shortify.testingTiga",
    long_url: "https://docs.github.com/en/pull-requests/testing4",
  },
  {
    id: 5,
    date: "2 January 2023",
    user: "Testing Empat",
    title: "Testing link shortener shortify keempat",
    short_url: "shortify.testingEmpat",
    long_url: "https://docs.github.com/en/pull-requests/testing5",
  },
  {
    id: 6,
    date: "2 January 2023",
    user: "Testing Empat",
    title: "Testing link shortener shortify keempat",
    short_url: "shortify.testingEmpat",
    long_url: "https://docs.github.com/en/pull-requests/testing5",
  },
];
