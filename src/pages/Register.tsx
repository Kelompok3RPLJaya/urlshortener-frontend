import React from "react";
import { useForm } from "react-hook-form";
import FormValues from "@/constant/Type";
import TextInput from "@/components/TextInput";
import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  register("username", { required: "please enter a username" });
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
  register("agreement", { required: "This agreement is required" });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message);
        console.log(data);
      } else {
        alert(responseData.message);
        console.log(responseData);
      }
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  return (
    <section className="h-screen py-16 px-8 box-border md:flex justify-center items-center">
      <div className="h-full flex flex-col justify-between max-w-[400px] container mx-auto md:justify-center md:gap-y-4 md:max-w-md md:h-fit">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-bold text-[#6165D7] tracking-wide md:text-4xl">
              Create a new account
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
              <TextInput
                type="text"
                label="username"
                name="username"
                register={register}
                error={errors.username?.message}
              />
              <TextInput
                type="email"
                label="email"
                name="email"
                register={register}
                error={errors.email?.message}
              />
              <TextInput
                type="password"
                label="password"
                name="password"
                register={register}
                error={errors.password?.message}
              />
              <div className="flex items-center gap-x-2">
                <input type="checkbox" {...register("agreement")} />
                <label
                  htmlFor="checkbox"
                  className="text-sm text-[#041267] text-opacity-80"
                >
                  I agree to the{" "}
                  <Link href="" className="text-[#766FF9]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="" className="text-[#766FF9]">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <p className="text-sm text-red-600 text-center">
              {errors.agreement?.message}
            </p>
            <button
              type="submit"
              className="px-6 py-3 rounded-3xl bg-[#766FF9] font-semibold text-gray-100"
            >
              Create account
            </button>
          </form>
        </div>
        <div>
          <p className="text-center md:text-sm text-[#041267] text-opacity-80">
            already have an account?{" "}
            <Link href="" className="text-[#766FF9]">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
