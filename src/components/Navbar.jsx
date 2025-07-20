import React, { useState } from "react";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mb-20 mt-0.8 py-6 h-[60px] w-full border-b border-slate-900">
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* Hamburger for Mobile */}
        <div className="md:hidden text-2xl text-slate-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <div className={`flex-col md:flex-row gap-4 items-center text-slate-500 text-sm md:flex ${isOpen ? 'flex' : 'hidden'} md:gap-4`}>
          <a href="#home" className="block py-1">Home</a>
          <a href="#About" className="block py-1">About</a>
          <a href="#tech" className="block py-1">Technologies</a>
          <a href="#Projects" className="block py-1">Projects</a>
          <a href="#achievements" className="block py-1">Achievements</a>
          <a href="#contact" className="block py-1">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="Social hidden md:flex items-center justify-center gap-5 text-2xl m-2">
          <a href="https://drive.google.com/file/d/1wDTDb43_7EkKT1ne94cMfBTDqQ_HnKcL/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
            <BsFileEarmarkPerson />
          </a>
          <a href="https://linkedin.com/in/adityapotdar24" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/adityaa2404" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
