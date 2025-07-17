import React from "react";
import { HiOutlineCode } from 'react-icons/hi';  
import {RiReactjsLine} from 'react-icons/ri';
import { SiTailwindcss } from 'react-icons/si';
import { SiMongodb } from 'react-icons/si';
import { SiExpress } from 'react-icons/si';
import { FaNodeJs } from 'react-icons/fa';
import { FaPython } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';


function Tech(){
    return (
        <div className="border-b border-neutral-800 pb-24">
            <h2 className="my-20 text-center text-4xl">
                <span className="bg-gradient-to-br from-dark via-slate-100 to-darkest text-transparent bg-clip-text">Technologies</span>
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <FaPython className="text-4xl text-amber-200 " />  
                </div>

                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <SiCplusplus className="text-4xl text-sky-700 " />  
                </div>
                
                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <RiReactjsLine className="text-4xl text-cyan-300 animate-spin" style={{ animationDuration: "3s" }}/>  
                </div>
                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <SiTailwindcss className="text-4xl text-cyan-500 " />  
                </div>

                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <SiMongodb className="text-4xl text-green-500 " />  
                </div>

                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <SiExpress className="text-4xl text-slate-100 " />  
                </div>
                <div className="rounded-full border-4 border-neutral-800 p-4">
                   <FaNodeJs className="text-4xl text-green-500 " />  
                </div>

            </div>

        </div>
    )
}
export default Tech;