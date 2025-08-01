import React, { useState } from 'react';
import menu from '../assets/menu.png';
import close from '../assets/close.png'
import logo from '../assets/logo.png'
import { Mail, Linkedin, Github } from 'lucide-react';
import BigMenu from './BigMenu';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex  justify-between items-center px-6 py-4 bg-transparent text-white">
        {/* Logo/Image */}
        <div className="text-2xl font-bold">
          <img src={logo} alt="Logo" className="h-10 w-10 cursor-pointer" />
        </div>

        

        {/* Menu Button with images */}
        <button onClick={toggleMenu} className=" z-50 cursor-pointer">
          <img
            src={menuOpen ? close : menu}
            alt="Menu"
            className="w-8 h-8"
          />
        </button>

        {/* Fullscreen Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center text-white text-3xl gap-10">
            <a href="/#home" onClick={toggleMenu} className="hover:text-gray-300">Home</a>
            <a href="/#projects"  onClick={toggleMenu} className="hover:text-gray-300">Projects</a>
            <a href="/#about" onClick={toggleMenu} className="hover:text-gray-300">About</a>
            <a href="/#connect" onClick={toggleMenu} className="hover:text-gray-300">Connect</a>

            <div className="flex gap-6 mt-10 text-2xl">
              <a
          href="mailto:sruchi73@example.com"
className="flex flex-row gap-2 items-center justify-center bg-white text-black hover:bg-emerald-200
 px-4 py-2 mt-7 rounded-xl shadow-lg hover:text-gray-800  transition-all"        >
          <Mail className="w-5 h-5" /> Email
        </a>
        <a
          href="www.linkedin.com/in/uruchisharma"
          target="_blank"
          rel="noopener noreferrer"
className=" flex flex-row gap-2 items-center justify-center bg-white text-black hover:bg-emerald-200
 px-4 py-2 mt-7 rounded-xl shadow-lg hover:text-gray-800  transition-all"        >
          <Linkedin className="w-5 h-5" /> LinkedIn
        </a>
        <a
          href="https://github.com/snowXshade"
          target="_blank"
          rel="noopener noreferrer"
className="flex flex-row gap-2 items-center justify-center bg-white text-black hover:bg-emerald-200
 px-4 py-2 mt-7 rounded-xl shadow-lg hover:text-gray-800  transition-all"        >
          <Github className="w-5 h-5" /> GitHub
        </a>
            </div>
          </div>
        )}
      </div>

      
    </>
  );
}
