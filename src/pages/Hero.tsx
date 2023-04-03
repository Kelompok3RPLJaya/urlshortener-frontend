import PasteLink from '@/components/PasteLink'
import React from 'react'

const Hero = () => {
    return (
        
        <div style={{ backgroundImage: "url('/landingBG.jpg')" }} className="bg-center bg-cover bg-no-repeat landing-h w-screen">

            <div className='flex flex-col justify-center items-center content-center gap-10 h-full'>

                <div className='flex flex-col w-2/3 2xl:w-1/2 items-center'>
                    <div className='flex flex-col sm:flex-row sm:gap-2 sm:py-10'>
                        <div className='font-bold text-5xl text-[#0E9EE8] drop-shadow-lg'>PopLink</div>
                        <div className='font-bold text-5xl text-[#041267] drop-shadow-lg'>PopLink</div>
                        <div className='font-bold text-5xl text-[#5039E5] drop-shadow-lg'>PopLink</div>
                    </div>
                </div>

                <PasteLink />

            </div>

        </div>
    )
}

export default Hero;