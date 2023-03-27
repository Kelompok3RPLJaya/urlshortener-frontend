import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiOutlineLink } from 'react-icons/hi'
import Switch from './Switch';

export interface FormValues {
    long_url: string,
    is_custom: string,
    is_private: string,
    short_url: string,
    password: string,
    is_feeds: string,
    title: string;
}

const PasteLink = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({ mode: "onChange" });

    register('long_url', {
        required: {
            value: true,
            message: "Link is required!"
        }
    });
    register('title', {
        required: {
            value: true,
            message: "Title is required!"
        }
    });

    const [customIsToggled, setCustomIsToggled] = useState(false);
    const [privateIsToggled, setPrivateIsToggled] = useState(false);
    const [feedsIsToggled, setFeedsIsToggled] = useState(true);

    const [responseMessage, setResponseMessage] = useState("");
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const onSubmit = async (data: FormValues) => {
        try {
          const response = await fetch(
            "https://url-shortener-production-e495.up.railway.app/api/url_shortener",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
              },
              body: JSON.stringify(data),
            }
          );
          const responseData = await response.json();
          if (response.ok) {
            setResponseMessage(responseData.message);
            setIsPopUpVisible(true);
            console.log(data);
          } else {
            setResponseMessage(responseData.message);
            setIsPopUpVisible(true);
            console.log(responseData);
          }
        } catch (error) {
          console.error(error);
        }
        reset();
      };

    return (
        <div className='flex flex-col sm:w-[35rem]'>

            <form onSubmit={handleSubmit(onSubmit)} className=''>

                <div className='flex flex-col gap-2'>

                    <div className='flex flex-row items-center justify-between  bg-white rounded-full gap-2 drop-shadow-lg'>

                        <label htmlFor="pasteLink"><HiOutlineLink style={{ color: '#766FF9' }} size={20} className="ml-5 sm:ml-4" /></label>
                        <input id="pasteLink" type="text" placeholder='Paste a link and shorten it' {...register("long_url")} className="grow text-sm py-4 px-2 sm:py-3 sm:text-base focus:outline-none" />
                        <input type="submit" value="Shorten" className='py-2 px-5 mr-3 cursor-pointer bg-[#766FF9] rounded-full shadow-lg text-white text-sm' />

                    </div>

                    <p className='text-sm text-red-500 px-5 font-medium'>{errors.long_url?.message}</p>

                    <div className='flex flex-row gap-2 mx-5 items-center w-1/2'>
                        <label htmlFor="title" className='text-sm font-semibold'>Title: </label>
                        <input id="title" type="text" placeholder='Enter Title' 
                        {...register("title")} 
                        className="text-sm rounded-full px-2 py-1 drop-shadow-md focus:outline-none" />
                    </div>
                    <p className='text-sm text-red-500 font-medium mx-5'>{errors.title?.message}</p>

                    <div className='flex flex-col sm:flex-row gap-2 mx-5'>

                        <div className='grow-0 flex flex-col gap-2 basis-[60%]'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register("is_custom")} className="sr-only peer" checked={customIsToggled} onChange={() => setCustomIsToggled(!customIsToggled)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#766FF9]"></div>
                                <span className="ml-3 text-sm font-medium text-black dark:text-black"> Custom Link</span>
                            </label>

                            {customIsToggled ? 
                            <div className={`flex flex-col gap-2`}>
                                <div className={`flex flex-row items-center`}>
                                    <label htmlFor="customLink" className='text-sm font-semibold'>Poppins.in/</label>
                                    <input id="customLink" type="text" placeholder='Add custom link'
                                        {...register('short_url', {
                                            required: {
                                                value: true,
                                                message: "custom link is required!"
                                            }
                                        })}
                                        className="text-sm rounded-full px-2 py-1 drop-shadow-md focus:outline-none" />
                                </div>
                                <p className='text-sm text-red-500 font-medium'>{errors.short_url?.message}</p>
                            </div> : null}

                        </div>

                        <div className='grow-0 flex flex-col gap-2 basis-[40%]'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register("is_private")} className="sr-only peer" checked={privateIsToggled} onChange={() => setPrivateIsToggled(!privateIsToggled)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#766FF9]"></div>
                                <span className="ml-3 text-sm font-medium text-black dark:text-black">Private</span>
                            </label>

                            {privateIsToggled ? 
                            <div className={`flex flex-col gap-2`}>
                                <div className='flex flex-row items-center'>
                                    <input type="text" placeholder='Set Password'
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: "Password is required!"
                                            }
                                        })}
                                        className="text-sm rounded-full px-2 py-1 drop-shadow-md focus:outline-none" />
                                        
                                </div>
                                <p className={`${privateIsToggled ? null : "hidden"}ml-1 text-sm text-red-500 font-medium`}>{errors.password?.message}</p>
                            </div> : null}
                        </div>

                    </div>

                    <div className='flex flex-col gap-2 mx-5'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" {...register("is_feeds")} className="sr-only peer" checked={feedsIsToggled} onChange={() => setFeedsIsToggled(!feedsIsToggled)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#766FF9]"></div>
                            <span className="ml-3 text-sm font-medium text-black dark:text-black">Feeds</span>
                        </label>
                    </div>

                    {/* <Switch name="custom" isToggled={customIsToggled} onToggle={()=>setCustomIsToggled(!customIsToggled)} register={register}/>
                    <Switch name="private" isToggled={privateIsToggled} onToggle={()=>setPrivateIsToggled(!privateIsToggled)} register={register}/>   */}
                </div>

            </form>



        </div>
    )
}

export default PasteLink;