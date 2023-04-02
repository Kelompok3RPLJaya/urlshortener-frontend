import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface accessProp {
  password: string;
}

export default function ShortUrl() {
  const router = useRouter();
  const { slug } = router.query;
  const short_url = slug?.[0]; // get the first element of the slug array

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<accessProp>();
  const [message, setMessage] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState(false);

  const onSubmit = async (data: accessProp) => {
    try {
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/long_url/${short_url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log(data);
      if (response.ok) {
        window.location.href = responseData.data.long_url;
        console.log(data);
      } else {
        console.log(responseData);
      }
    } catch (error) {}
    reset();
    console.log(data);
  };

  async function fetchLongUrl() {
    try {
      console.log(short_url);
      const response = await fetch(
        `https://urlshortener-backend-production.up.railway.app/api/url_shortener/long_url/${short_url}`,
        {
          method: "POST",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        if (responseData.data.is_private == false) {
          window.location.href = responseData.data.long_url;
        }
      } else {
        if (responseData.data.is_private == true) {
          setIsPrivate(true);
          console.log("masuk private");
        }
        setMessage(responseData.message);
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (short_url) {
      fetchLongUrl();
    }
  }, [short_url]);

  if (!short_url || !router.asPath.startsWith("/short/")) {
    return (
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-y-6">
          <p className="text-3xl font-medium text-[#041267]">404 Not Found</p>
        </div>
      </section>
    );
  }
  console.log(isPrivate);

  return (
    <section className="min-h-screen w-full flex justify-center items-center text-[#041267]">
      {isPrivate ? (
        <div className="flex flex-col gap-y-4 max-w-[20rem]">
          <div className="flex flex-col items-center gap-y-4 w-full confirm p-6">
            <h2 className="text-lg font-medium">Confirm access</h2>
            <form
              action=""
              className="flex flex-col w-full gap-y-4 rounded-md text-sm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col gap-y-2">
                <p>Password</p>
                <input
                  type="password"
                  {...register("password")}
                  className="px-4 py-1 w-full box-borderfdf border-2 border-indigo-200 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-center bg-indigo-300 rounded-md font-medium hover:bg-indigo-400"
              >
                Confirm
              </button>
            </form>
          </div>
          <p className="text-[.825rem] px-2">
            <span className="font-medium">hint</span> : this link is a private
            link that needs a{" "}
            <span className="text-indigo-500 font-medium">password</span>. The
            password must be match with the ones you make when you created this
            url
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-6">
          <div className="w-6 h-6 rounded-full bg-indigo-300 animate-bounce"></div>
          <div className="text-lg font-medium text-[#041267] flex flex-col items-center gap-y-2">
            <p className="text-base font-normal">
              Redirecting you to {short_url} ...
            </p>
            <p>Please wait for a moment</p>
          </div>
        </div>
      )}
    </section>
  );
}
