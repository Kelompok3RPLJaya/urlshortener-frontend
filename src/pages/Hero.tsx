import PasteLink from '@/components/PasteLink'
import React from 'react'

const Hero = () => {
    return (
        <div style={{ backgroundImage: "url('/landingBG.jpg')" }} className="bg-center bg-cover bg-no-repeat landing-h w-screen">

            <div className='flex flex-col justify-center items-center content-center gap-10 h-full'>

                <div className='flex flex-col w-2/3 2xl:w-1/2 items-center'>
                    <div className='flex flex-col sm:flex-row sm:gap-2 py-10'>
                        <div className='font-bold text-5xl text-[#0E9EE8] drop-shadow-lg'>Poppins</div>
                        <div className='font-bold text-5xl text-[#041267] drop-shadow-lg'>Poppins</div>
                        <div className='font-bold text-5xl text-[#5039E5] drop-shadow-lg'>Poppins</div>
                    </div>
                    {/* <div className='font-semibold text-lg invisible max-h-0 sm:max-h-max sm:visible text-center'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus magnam excepturi placeat aliquid deleniti eligendi exercitationem ad. Reprehenderit aperiam dolores neque id odit in, iste suscipit</p>
                    </div> */}
                </div>

        <PasteLink />

                {/* <div className='flex flex-col items-center gap-5'>
                    <div className='font-semibold'>For more features</div>

                    <div className='flex flex-col sm:flex-row items-center text-black font-semibold gap-2'>

                        <Link href="/Login" className="py-2 px-5 bg-[#0E9EE8]  rounded-3xl drop-shadow-lg">
                            <div className='flex flex-row items-center gap-2'><AiOutlineUser />Log in</div>
                        </Link>
                        Or
                        <Link href="/Register" className="py-2 px-5 bg-[#766FF9] rounded-3xl drop-shadow-lg">
                            <div className='flex flex-row items-center gap-2'><AiOutlineUser />Register</div>
                        </Link>
                    </div>
                </div> */}

            </div>



        </div>
    )
}

export default Hero;