// Projects.jsx

import React from 'react';
import projects from './pro';  

import { useNavigate } from "react-router-dom"
import github from '../assets/github.png'

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 text-center" id='projects'>
      <h2 className="text-4xl font-bold mb-14 text-gray-800">Projects</h2>
      <p>Disclaimer : to view this project you need to connect mongo bd local host connection and also need to ensure jwt in env file </p>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-16">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md border-none hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-700">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-sm text-gray-500 mb-6 font-semibold">Technologies: {project.tech.join(', ')}</p>
            </div>
            <div className="flex flex-row gap-7 flex-wrap items-center justify-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Repository"
              >
                <img
                  className="w-9 h-9 cursor-pointer hover:scale-105 transition-all duration-300"
                  src={github}
                  alt="GitHub Repo"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;