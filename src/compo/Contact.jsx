import React, { useState } from 'react';
import validator from 'validator';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [result, setResult] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

  const isAllowedEmail = (email) => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const isBasicEmail = validator.isEmail(value);
      const isDomainAllowed = isAllowedEmail(value);
      setIsEmailValid(isBasicEmail && isDomainAllowed);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setResult('Please fill in all fields.');
      return;
    }

    if (!isEmailValid) {
      setResult('Please enter a valid email.');
      return;
    }

    setResult('Sending...');

    const payload = new FormData();
    payload.append('access_key', 'eaddba48-4ab2-4d3b-93fc-dae16e4591ce');
    payload.append('name', name);
    payload.append('email', email);
    payload.append('message', message);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (data.success) {
        setResult('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult('Something went wrong. Try again.');
        console.error(data);
      }
    } catch (err) {
      setResult('Error sending message.');
      console.error(err);
    }
  };

  return (
    <section id="connect" className="py-20 bg-gradient-to-b from-gray-100 to-white px-6 md:px-16">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Connect with Me</h2>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        <a href="mailto:sruchi73@gmail.com" className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:scale-105 hover:bg-gray-50 transition-all duration-100 rounded-xl shadow-md hover:opacity-90">
          <Mail className="w-5 h-5" /> Email
        </a>
        <a href="https://www.linkedin.com/in/uruchisharma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:scale-105 hover:bg-gray-50 transition-all duration-100 rounded-xl shadow-md hover:opacity-90">
          <Linkedin className="w-5 h-5" /> LinkedIn
        </a>
        <a href="https://github.com/snowXshade" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:scale-105 hover:bg-gray-50 transition-all duration-100 rounded-xl shadow-md hover:opacity-90">
          <Github className="w-5 h-5" /> GitHub
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={onSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
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
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isEmailValid ? 'focus:ring-indigo-500' : 'border-red-400 focus:ring-red-400'}`}
          />
          {!isEmailValid && <p className="text-red-500 text-sm mt-1">Invalid email address.</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Let's connect for work, freelance, or collaboration!"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-200 hover:bg-black hover:text-white rounded-lg transition-all duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Result Message */}
      {result && (
        <div className={`text-center mt-6 text-lg font-medium ${result.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {result}
        </div>
      )}
    </section>
  );
};

export default Contact;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { name, email, message } = formData;

  //   if (!name.trim() || !email.trim() || !message.trim()) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   try {
  //     await axios.post('http://localhost:3000/contact', { name, email, message });
  //     alert('Message sent successfully');
  //     setFormData({ name: '', email: '', message: '' });
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     alert('Failed to send message');
  //   }
  // };


