// src/components/StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [regno, setRegno] = useState('');

  const API_URL = 'http://localhost:3000/students';

  // Fetch students from backend
  const fetchStudents = async () => {

    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      alert("no backend server initialted at 3000 port!");
      console.error('Error fetching students:', err);
    }
  };

  // Add new student
  const addStudent = async () => {
    if (!name.trim() || !course.trim() || !regno.trim()) {
      alert('Please fill in all name, course and regno.');
      return;
    }

    try {
      await axios.post(API_URL, { name, course, regno });
      setName('');
      setCourse('');
      setRegno('');
      fetchStudents(); // refresh list
    } catch (err) {
      alert("failed to add data!");
      console.error('Error adding student:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    // main div
    <div className=' flex items-center justify-center'>
    <div className='w-[90%]  bg-gray-100 flex flex-wrap lg:flex-col gap-2 py-2 justify-center items-center lg:justify-start lg:items-start m-14 rounded-2xl' style={{ padding: '20px' }}>
      {/* Heading */}
      <h1 className='text-2xl font-bold text-blue-500 pl-10 mb-2 pt-14' style={{ marginTop: '30px' }}>Student Dashboard</h1>
      {/* main body */}
      <div className='w-auto md:w-full px-2 py-2 flex flex-col gap-8 flex-wrap lg:flex-row lg:justify-around'>


        {/* student data table */}
        <div className='w-auto md:2/3 lg:w-2/4 m-1.5 md:m-8 px-1.5 md:px-2 py-2 border border-none rounded-2xl  '>
          <h2 className='text-gray-500 font-bold text-xl py-4'>Student List</h2>
          <table className='w-full mt-2 text-gray-900' style={{ borderCollapse: 'collapse', border: '1px solid gray', }}>
            <thead>
              <tr>
                {/* <th style={cellStyle}>ID</th> */}
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Course</th>
                <th style={cellStyle}>Registration No.</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  {/* <td style={cellStyle}>{s._id}</td> */}
                  <td style={cellStyle}>{s.name}</td>
                  <td style={cellStyle}>{s.course}</td>
                  <td style={cellStyle}>{s.regno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STUDENT DATA INPUT FORM */}
        <div className='w-auto md:w-2/3 lg:w-1/4 bg-white px-2 py-2 m-1.5 md:m-8 border border-none rounded-2xl shadow-lg flex flex-wrap flex-col gap-2'>
          <h2 className='text-gray-500 font-bold text-xl py-4 px-4' style={{ marginTop: '30px' }}>Add New Student</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '18px',marginRight: '18px', marginBottom: '5px',padding : '4px', border: '0.5px solid gray' }}
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{ marginLeft: '18px',marginRight: '18px', marginBottom: '5px',padding : '4px', border: '0.5px solid gray' }}
          />
          <input
            type="text"
            placeholder="Registration No."
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
            style={{ marginLeft: '18px',marginRight: '18px', marginBottom: '5px',padding : '4px', border: '0.5px solid gray' }}
          />
          <button className='bg-blue-700 hover:bg-blue-900  text-white py-2 border border-none rounded-lg mt-4' style={{marginLeft: '18px',marginRight: '18px', marginBottom: '5px',}} onClick={addStudent}>Add Student</button>
        </div>
      </div>
    </div>
    </div>
  );
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #aaa',
  textAlign: 'left',
};


export default StudentDashboard;
