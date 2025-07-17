import React from "react";
import logo from "../assets/logo.png"
//ibelick.com

import { FaLinkedin, FaGithub} from "react-icons/fa";

function Navbar(){
    return (
        <nav className="mb-20 mt-0.8 flex items-center justify-between py-6 h-[60px] w-full">
            <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="Logo" className="h-30 w-30" />

                
            </div>
            <div className="Social flex items-center justify-center gap-4 m-8 text-2xl">
                <FaLinkedin/>
                
                <FaGithub/>
                
            </div>
        </nav>
    );
}

export default Navbar;
