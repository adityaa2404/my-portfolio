import { BsFileEarmarkPerson } from "react-icons/bs";

import React from "react";
import logo from "../assets/logo.png"

//ibelick.com

import { FaLinkedin, FaGithub} from "react-icons/fa";
import Untitled from '../assets/Untitled.png'
function Navbar(){
    return (
        <nav className="mb-20 mt-0.8 flex items-center justify-between py-6 h-[60px] w-full">
            <div className="flex flex-shrink-0 items-center">
                 <img src={Untitled} alt="" className="h-13 w-13" />
               
                
            </div>
            <div className="Social flex items-center justify-center gap-5 m-8 text-2xl">
                
                <a href="https://drive.google.com/file/d/1wDTDb43_7EkKT1ne94cMfBTDqQ_HnKcL/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                   <BsFileEarmarkPerson className="text-2xl" />
                </a>
                
                <a href="www.linkedin.com/in/adityapotdar24" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin/>
                </a>
                
                
                <a href="https://github.com/adityaa2404" target="_blank" rel="noopener noreferrer">
                    <FaGithub/>
                </a>
                
                
            </div>
        </nav>
    );
}

export default Navbar;
