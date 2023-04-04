import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FormValues from "@/constant/Type";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
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

  const [toggle, setToggle] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(
        "https://urlshortener-backend-production.up.railway.app/api/user/login",
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
        setResponseMessage(responseData.errors);
        setIsPopUpVisible(true);
        console.log(responseData);
      }
    } catch (error) {}
    reset();
  };

  const HandleOnClose = () => {
    setIsPopUpVisible(false);
    if (responseMessage == "Berhasil Login") {
      router.push("/sections/User");
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
            <div className="flex flex-col gap-y-2 text-[#041267]">
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="px-6 py-3 border rounded-3xl"
              />
              <p className="text-sm text-red-600 pl-4 box-border">
                {errors.email?.message}
              </p>
              <div className="relative w-full">
                <input
                  type={toggle ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="px-6 py-3 border rounded-3xl w-full"
                />
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 right-5"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
                </button>
              </div>
              <p className="text-sm text-red-600 pl-4 box-border">
                {errors.password?.message}
              </p>
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
            don&rsquo;t have an account yet?{" "}
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
