import axios from 'axios';
import React, { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:3000/contact', { name, email, message });
      alert('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <section id="connect" className="py-20 bg-gradient-to-b from-gray-100 to-white px-6 md:px-16">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Connect with Me</h2>

      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        <a
          href="mailto:sruchi73@gmail.com"
          className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:scale-105 hover:bg-gray-50 transition-all duration-100 rounded-xl shadow-md hover:opacity-90"
        >
          <Mail className="w-5 h-5" /> Email
        </a>
        <a
          href="https://www.linkedin.com/in/uruchisharma"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:scale-105 hover:bg-gray-50 transition-all duration-100 rounded-xl shadow-md hover:opacity-90"
        >
          <Linkedin className="w-5 h-5" /> LinkedIn
        </a>
        <a
          href="https://github.com/snowXshade"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:scale-105 hover:bg-gray-50 transition-all duration-100 rounded-xl shadow-md hover:opacity-90"
        >
          <Github className="w-5 h-5" /> GitHub
        </a>
      </div>

      {/* ✅ Fix: add onSubmit handler */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
      >
        {/* ✅ Fix: add name, value, and onChange */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Let’s connect for something awesome like work, freelance, or collaboration!"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3  bg-emerald-200 hover:bg-black hover:text-white rounded-lg transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
