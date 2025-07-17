import React from "react";
import dp from '../assets/findp-1.png'
import { HERO_GOAL } from "../constants";

function Hero (){
    return(
        <div className="border-b border-neutral-900 pb-4 lg:mb-35">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">Aditya Potdar</h1>
                        <span className="bg-gradient-to-br from-dark via-slate-600 to-darkest leading-relaxed bg-clip-text text-4xl tracking-tight text-transparent">ECE Undergrad &nbsp;|&nbsp;Full Stack Developer &nbsp;</span>
                        <p className="my-2 py-6 max-w-xl font-light tracking-tighter">{HERO_GOAL}</p>
                    
                    </div>
                    
                </div>
                <div className="w-full lg:w-1/2 lg:p-8 ">
                    <div className="flex justify-center ">
                        <img src={dp} alt="dp" className="rounded-xl object-cover shadow-lg w-90 h-90"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;