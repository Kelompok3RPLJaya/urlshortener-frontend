import React, { useState } from "react";
import Questions from "@/components/Questions";

const FAQ = () => {

const [customIsToggled, setCustomIsToggled] = useState(false);
const [privateIsToggled, setPrivateIsToggled] = useState(false);
const [feedsIsToggled, setFeedsIsToggled] = useState(false);

const HandleOnClick = (isToggle : boolean, setIsToggle : React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsToggle(!isToggle);
}

  return <section className="flex flex-col w-full links-w">
    
    <div style={{ backgroundImage: "url('/landingBG.jpg')" }} className="bg-center bg-cover bg-no-repeat landing-h w-screen">

        <div className='flex flex-col justify-center items-center content-center gap-10 h-full'>

        <div className='flex flex-col items-center flex-wrap font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#0E9EE8] drop-shadow-lg'>Frequently Asked Questions</div>

            <div className="flex flex-col lg:flex-row w-[85%] gap-10">

                <div className=" flex flex-col basis-1/3 gap-2">
                    <Questions 
                        toggle={{ isToggle: customIsToggled, setIsToggle: setCustomIsToggled }} 
                        question={"What is a custom link?"} 
                        answer={"By default, the generated link is random. To change that, you can toggle on the custom link switch and write your desired shortened link name."}                
                    />
                </div>

                <div className=" flex flex-col basis-1/3 gap-2">
                    <Questions 
                        toggle={{ isToggle: privateIsToggled, setIsToggle: setPrivateIsToggled }} 
                        question={"What is a password link?"} 
                        answer={"To protect your link from being accessed by the public, you can add a password to authorize who can access your link. To do that, you can toggle on the password switch and write your desired password."}                
                    />
                </div>

                <div className=" flex flex-col basis-1/3 gap-2">
                    <Questions 
                        toggle={{ isToggle: feedsIsToggled, setIsToggle: setFeedsIsToggled }} 
                        question={"What is feeds option?"} 
                        answer={"Feeds is a page for users to see what others have shortened. You can share your shortened link into the feeds by toggling on the feeds switch."}                
                    />
                </div>
            </div>
            
        </div>

    </div>
    
  </section>;
};

export default FAQ;
