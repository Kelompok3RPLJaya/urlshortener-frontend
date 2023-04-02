import React from 'react'

type QuestionsProp = {
    toggle: {
        isToggle : boolean,
        setIsToggle : React.Dispatch<React.SetStateAction<boolean>>
    },
    question: string,
    answer: string
}

const Questions = ({toggle, question, answer}: QuestionsProp) => {
    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={toggle.isToggle} onChange={() => toggle.setIsToggle(!toggle.isToggle)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#766FF9]"></div>
                <span className="ml-3 text-md font-semibold text-black dark:text-black"> {question} </span>
            </label>
            {toggle.isToggle && (
                <div className="max-w-[80%]">
                    <p className='text-sm'>
                        {answer}
                    </p>
                </div>
            )}
        </>
    )
}

export default Questions