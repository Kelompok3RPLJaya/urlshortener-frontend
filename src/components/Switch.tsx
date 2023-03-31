import { ErrorMessage } from '@hookform/error-message';
import React from 'react'
import { FieldErrors, UseFormRegister} from 'react-hook-form';
import { FormValues } from './PasteLink'

type SwitchProps = {
    name: string,
    textReg?: string,
    toggle: {
        isToggle : boolean
        setIsToggle : React.Dispatch<React.SetStateAction<boolean>>
    },
    register: UseFormRegister<FormValues>,
    errors : FieldErrors<FormValues>,
    label1? : string,
    label2? : string;
}

const Switch = ({name, textReg, toggle, register, errors, label1, label2}: SwitchProps) => {

    return (
        <>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register((name as keyof FormValues))} className="sr-only peer" checked={toggle.isToggle} onChange={() => toggle.setIsToggle(!toggle.isToggle)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#766FF9]"></div>
                    <span className="ml-3 text-sm font-medium text-black dark:text-black"> {label1}</span>
                </label>

                {toggle.isToggle && textReg ?
                    <div className={`flex flex-col gap-2`}>

                        <div className={`flex flex-row items-center`}>

                            {label2 ? <label htmlFor={textReg} className='text-sm font-semibold'>{label2}</label> : null }
                            <input id={textReg} type="text" placeholder='Add custom link'
                                {...register(textReg as keyof FormValues, {
                                    required: {
                                        value: true,
                                        message: `${label1} is required!`
                                    }
                                })}
                                className="text-sm rounded-full px-2 py-1 drop-shadow-md focus:outline-none" />
                            
                        </div>

                        <p className='text-sm text-red-500 font-medium'>
                            <ErrorMessage errors={errors} name={textReg as keyof FormValues} />
                        </p>
                        
                    </div> : null}

        </>
    )
}

export default Switch