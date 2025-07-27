import React from 'react';
import profilePic from '../assets/user.jpeg'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-24 bg-gradient-to-b from-gray-200 to-gray-50 text-black"
    >
      {/* Profile Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src={profilePic}
          alt="Ruchi"
          className="rounded-full w-60 h-60 object-cover shadow-xl hover:scale-110 transition-all duration-500"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hi, I'm Ruchi</h1>
        <h2 className="text-2xl md:text-3xl mb-4">A Full Stack Developer</h2>
        <p className="text-lg max-w-xl mx-auto md:mx-0">
          I’m passionate about building scalable web apps with elegant user experiences. 
          I enjoy transforming ideas into reality with clean and efficient code.
        </p>
        <div className='flex flex-row flex-wrap gap-6 items-center'>
          {/* Let's Talk Button */}
        <a
          href="#connect"
          className=" md:inline-block bg-white text-black hover:bg-gradient-to-r hover:from-black hover:to-gray-800
 px-4 py-2 mt-7 rounded-2xl shadow-lg hover:text-white  transition-all"
        >
          Let's Talk
        </a>
        <p className="text-center mt-8">
  <a
    href="/resume.pdf"   
    // resume link dalo bhaiya
    download
    className="inline-block px-4 py-2 text-white rounded-2xl shadow bg-gradient-to-r from-black to-gray-800
"
  >
    Download Resume
  </a>
</p>

        </div>
      </div>
    </section>
  );
}
