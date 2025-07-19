import React from 'react'
import Backbtn from './Backbtn'

const Footer = () => {
  return (
    <div className='bg-gray-100 py-20 px-20'>
      <footer className="relative text-sm text-gray-500 z-10">
        <div>
          <div className="flex flex-col justify-center items-center pt-6 gap-4">
            <div className="text-center md:text-left">
              <p>Built with React, Tailwind CSS, Lucide Icons</p>
            </div>
            <div className="text-center md:text-right">
              <a
                href="https://github.com/yourusername/yourprojectrepo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                View Source on GitHub
              </a>
            </div>
            <div>
              <a href="/#home"
                className="text-indigo-600 hover:underline"
              >Back to Home</a>
            </div>
          </div>
          <div className="mt-4 text-center">&copy; {new Date().getFullYear()} Ruchi Sharma. All rights reserved.
          </div>
        </div>

      </footer>

    </div>
  )
}

export default Footer
