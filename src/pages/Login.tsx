import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FormValues from "@/constant/Type";
import { FormDataLogin } from "@/constant/Data";
import TextInput from "@/components/TextInput";
import Link from "next/link";
import Popup from "@/components/Popup";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  register("email", {
    required: "please enter your email",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email",
    },
  });
  register("password", {
    required: "please enter your password",
    minLength: {
      value: 8,
      message: "Minimum 8 characters",
    },
  });
  register("reminder");
  const [responseMessage, setResponseMessage] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(
        "https://url-shortener-production-e495.up.railway.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setResponseMessage(responseData.message);
        localStorage.setItem("token", responseData.data.token);
        setIsPopUpVisible(true);
        console.log(data);
      } else {
        setResponseMessage(responseData.message);
        setIsPopUpVisible(true);
        console.log(responseData);
      }
    } catch (error) {}
    reset();
  };

  const HandleOnClose = () => {
    setIsPopUpVisible(false);
    if (responseMessage == "Berhasil Login") {
      router.push("/User");
    }
  };

  return (
    <section
      className={`h-screen py-16 px-8 box-border md:flex justify-center items-center ${
        isPopUpVisible ? "backdrop-blur" : ""
      }`}
    >
      <div className="h-full flex flex-col justify-between max-w-[400px] container mx-auto md:justify-center md:gap-y-4 md:max-w-md md:h-fit">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-bold text-[#6165D7] tracking-wide md:text-4xl">
              Welcome back 👋🏼
            </h2>
            <p className="text-[#9E9CC9]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, quae.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-2">
              {FormDataLogin.map((field) => (
                <TextInput
                  key={field.name}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  register={register}
                  error={errors[field.name]?.message}
                />
              ))}
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <input type="checkbox" {...register("reminder")} />
                  <label
                    htmlFor="checkbox"
                    className="text-sm text-[#041267] text-opacity-80"
                  >
                    remember me
                  </label>
                </div>
                <Link href="" className="text-sm text-[#766FF9]">
                  Forgot password?
                </Link>
              </div>
            </div>
            {isPopUpVisible && (
              <Popup message={responseMessage} onClose={HandleOnClose} />
            )}
            <button
              type="submit"
              className="px-6 py-3 rounded-3xl bg-[#766FF9] font-semibold text-gray-100"
            >
              Log in now
            </button>
          </form>
        </div>
        <div>
          <p className="text-center md:text-sm text-[#041267] text-opacity-80">
            already have an account?{" "}
            <Link href="/Register" className="text-[#766FF9]">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
