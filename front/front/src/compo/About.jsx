import React from 'react';

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-6 py-20 bg-white text-black overflow-hidden flex items-center justify-center"
    >
      {/* Floating bubbles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-300 opacity-20 animate-bubble"
            style={{
              width: `${15 + Math.random() * 35}px`,
              height: `${15 + Math.random() * 35}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* About content box */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl">
        {/* Intro text */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg">
            Hi! I'm <strong>Ruchi</strong>, a passionate Full Stack Developer from <strong>Ranchi</strong>. I love
            creating real-world, impactful solutions using modern web technologies.
          </p>
        </div>

        {/* Two-column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8 relative">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold ">Education</h3>
            <p>
              <strong>Bachelor of Computer Applications</strong><br />
              Manipal University
            </p>
            <p>
              <strong>Electives:</strong><br />
              Cloud Computing, E-Commerce
            </p>
          </div>

          {/* Divider Line for desktop */}
          <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-px bg-gray-400 h-[80%]"></div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold ">Skill Set</h3>
            <ul className="list-disc list-inside">
              <li>MERN Stack (MongoDB, Express, React, Node)</li>
              <li>TailwindCSS, Bootstrap, CSS3</li>
              <li>Cloud: AWS, GCP (Basics)</li>
              <li>Git, GitHub, REST APIs</li>
              <li>Database: MySQL, MongoDB</li>
            </ul>
          </div>
        </div>
        {/* Let's Talk Button */}
        <a
          href="#connect"
          className="md:inline-block bg-white text-black hover:bg-gradient-to-r hover:from-black hover:to-gray-800
 px-4 py-2 mt-7 rounded-2xl shadow-lg hover:text-white  transition-all duration-300"
        >
          Hire Me
        </a>
      </div>
    </section>
  );
}
