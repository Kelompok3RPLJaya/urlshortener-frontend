import React from 'react'
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from './PasteLink'

type SwitchProps = {
    name: string,
    isToggled: boolean,
    onToggle: () => void,
    register: UseFormRegister<FormValues>;
}

// Masih on progress
const Switch = ({name, isToggled, onToggle, register}:SwitchProps) => {
    return (
        <></>
        // <label className="relative inline-flex items-center cursor-pointer">
        //     <input type="checkbox" className="sr-only peer" checked={isToggled} onChange={onToggle} {...register(name as keyof FormValues)}/>
        //     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        //     <span className="ml-3 text-sm font-medium text-black dark:text-black">Custom Link</span>
        // </label>
    )
}

export default Switch