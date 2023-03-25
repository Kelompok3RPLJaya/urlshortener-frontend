import React from 'react'
import { useForm } from 'react-hook-form';
import {HiOutlineLink} from 'react-icons/hi'

export interface FormValues {
    link: string
}

const PasteLink = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({mode:"onChange"});

  return (
    <div className=''>

        <form onSubmit={handleSubmit((data) => { console.log(data); })} className='items-center bg-white flex flex-row bg-white rounded-full w-150 gap-2 p-2 sm:py-3 drop-shadow-lg'>
            <HiOutlineLink style={{ color: '#766FF9' }} size={20} className="ml-3"/>
            <input type="text" placeholder='Paste a link and shorten it' {...register("link")} className="text-sm w-48 sm:w-96 sm:text-base"/>
            <input type="submit" value="Shorten" className='py-2 px-5 cursor-pointer bg-[#766FF9] rounded-full shadow-lg text-white text-sm' />
        </form>
        
    </div>
  )
}

export default PasteLink