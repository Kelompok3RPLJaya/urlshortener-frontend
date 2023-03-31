import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiOutlineLink } from 'react-icons/hi'
import { MdContentCopy } from 'react-icons/md';
import Switch from './Switch';

export interface FormValues {
    long_url: string,
    is_custom: boolean,
    is_private: boolean,
    short_url: string,
    password: string,
    is_feeds: boolean,
    title: string;
}

const PasteLink = () => {

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({ 
        mode: "onChange", defaultValues:{}});

    const [randomStr, setRandomStr] = useState<string>("");

    const [isToken, setIsToken] = useState(false);
    const [token, setToken] = useState<string>();

    const [OutputLink, setOutputLink] = useState<string>("");

    const [customIsToggled, setCustomIsToggled] = useState(false);
    const [privateIsToggled, setPrivateIsToggled] = useState(false);
    const [feedsIsToggled, setFeedsIsToggled] = useState(false);

    const [isShortened, setIsShortened] = useState(false);

    function generateRandomString(length: number){
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
        
            for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        
            setRandomStr(result);
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            setIsToken(true);
            setToken(token);
        } else {
            setIsToken(false);
            setValue("title", "null");
        }

       generateRandomString(10);

    }, []);

    useEffect(()=>{

        if(customIsToggled){
            setValue("short_url", "");
        }else{
            setValue("short_url", randomStr);
        }

    }, [customIsToggled, randomStr])

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
    
    const newLink = () => {
        setIsShortened(!isShortened);
    }

    const onSubmit = async (data: FormValues) => {

        try {
            var response;
            if(isToken){
                response = await fetch(
                    "https://url-shortener-production-e495.up.railway.app/api/url_shortener",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                    }
                );
            }else{
                console.log("Udh ke submit buat yg ga login")
                response = await fetch(
                    "https://url-shortener-production-e495.up.railway.app/api/url_shortener",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
            }

            const responseData = await response.json();
            if (response.ok) {
                console.log(data);
                setOutputLink(getValues("short_url"));
                setIsShortened(!isShortened);
            } else {
                console.log(responseData);
            }
        } catch (error) {
            console.error(error);
        }        

        reset();
        generateRandomString(10);

        if(!isToken)
            setValue("title", "null");

        setCustomIsToggled(false);
        setPrivateIsToggled(false);
        setFeedsIsToggled(false);
    };

    return (
        <>
            <div className={`${isShortened ? "hidden" : "flex flex-col sm:w-[35rem]"}`}>

                <form onSubmit={handleSubmit(onSubmit)} className="">

                    <div className='flex flex-col gap-2'>

                        <div className='flex flex-row items-center justify-between  bg-white rounded-full gap-2 drop-shadow-lg'>

                            <label htmlFor="pasteLink"><HiOutlineLink style={{ color: '#766FF9' }} size={20} className="ml-5 sm:ml-4" /></label>
                            <input id="pasteLink" type="text" placeholder='Paste a link and shorten it' {...register("long_url")} className="grow text-sm py-4 px-2 sm:py-3 sm:text-base focus:outline-none" />
                            <input type="submit" value="Shorten" className='py-2 px-5 mr-3 cursor-pointer bg-[#766FF9] rounded-full shadow-lg text-white text-sm' />

                        </div>

                        <p className='text-sm text-red-500 px-5 font-medium'>{errors.long_url?.message}</p>

                        <div className='flex flex-col sm:flex-row gap-2 mx-5'>

                            <div className='grow-0 flex flex-col gap-2 basis-[60%]'>
                                <Switch 
                                    name='is_custom' 
                                    toggle ={{isToggle: customIsToggled, setIsToggle: setCustomIsToggled }} 
                                    textReg="short_url" 
                                    register={register} 
                                    errors={errors} 
                                    label1="Custom Link" 
                                    label2='Poppins.in/'
                                />
                            </div>
                            
                            <div className='grow-0 flex flex-col gap-2 basis-[40%]'>
                            <Switch 
                                    name='is_private'
                                    toggle ={{isToggle: privateIsToggled, setIsToggle: setPrivateIsToggled }} 
                                    textReg="password" 
                                    register={register} 
                                    errors={errors} 
                                    label1="Password"/> 
                            </div>
                            
                        </div>

                        <div className={` ${isToken ? "flex flex-col gap-2 mx-5" : "hidden"}`}>
                            <Switch 
                                name='is_feeds' 
                                toggle ={{isToggle: feedsIsToggled, setIsToggle: setFeedsIsToggled }} 
                                register={register} 
                                errors={errors} 
                                label1="Feeds"
                            />
                        </div>

                        <div className={` ${isToken ? "flex flex-col gap-2" : "hidden"}`}>
                            <div className='flex flex-row gap-2 mx-5 items-center w-1/2'>
                                <label htmlFor="title" className='text-sm font-semibold'>Title: </label>
                                <input id="title" type="text" placeholder='Title your link'
                                    {...register("title")}
                                    className="text-sm rounded-full px-2 py-1 drop-shadow-md focus:outline-none" />
                            </div>
                            <p className='text-sm text-red-500 font-medium mx-5'>{errors.title?.message}</p>
                        </div>
                        
                    </div>

                </form>

            </div>

            {isShortened && (
            <div className="flex flex-col items-center gap-2">
                <div className='flex flex-row items-center justify-between bg-white rounded-full py-2 px-3'>
                    <label htmlFor="copy" className='text-black font-semi-bold cursor-pointer'>{`poppins.in/${OutputLink}`}</label>
                    <button id='copy' type='button' onClick={() => {navigator.clipboard.writeText(`poppins.in/${OutputLink}`)}}>
                    <MdContentCopy style={{ color: '#766FF9' }} size={20} className="ml-5 sm:ml-4" />
                    </button>
                </div>
                
                <input type="button" value="Shorten More Link!" onClick={newLink} className='py-2 px-5 cursor-pointer bg-[#766FF9] rounded-full shadow-lg text-white text-sm' />
            </div>
            )}

        </>
    )
    
}

export default PasteLink;