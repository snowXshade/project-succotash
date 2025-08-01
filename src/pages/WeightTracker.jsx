import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import Backbtn from '../compo/Backbtn';

const WeightTracker = () => {
    const [formData, setFormData] = useState([]);
    const [date, setDate] = useState('');
    const [wgt, setWgt] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    //FETCHING DATA FROM BACKEND
    const fetchData = async () => {
        try {
            const res = await axios.get(API_URL+'/wgt');
            setFormData(res.data);
        } catch (err) {
            console.error('Error fetching data from backend', err);
        }
    }

    //ADD NEW DATA
    const addData = async () => {
        if (!date.trim() || !wgt.trim()) {
            alert('please enter date and weight!');
            return;
        }

        const weightValue = parseFloat(wgt);
        if (weightValue < 0) {
            alert('Weight cannot be less than 0!');
            return;
        }

        try {
            await axios.post(API_URL, { date, wgt });
            setDate('');
            setWgt('');
            fetchData();
        } catch (err) {
            console.error('Error in adding data to backend', err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full flex flex-col gap-2 lg:gap-20 items-center justify-center lg:flex-row py-2 px-2 mt-8 lg:pt-[100px]'>
                {/* FORM  */}
                <div className=' w-auto lg:w-1/5 flex gap-3.5 px-6  flex-col items-start pb-4 border-r border-gray-400'>
                    <h3 className=' text-amber-400 text-2xl font-bold pt-5 pb-3.5'>Weight Tracker</h3>
                    <input
                        type="date"
                        min='0'
                        placeholder="DD-MM-YYYY"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ padding: '4px', border: '0.5px solid gray' }}
                    />
                    <input
                        type="number"
                        placeholder="weight in kgs"
                        value={wgt}
                        onChange={(e) => setWgt(e.target.value)}
                        style={{ padding: '4px', border: '0.5px solid gray' }}
                    />
                    <button className='px-2 py-1 bg-blue-500 text-white hover:bg-blue-700' onClick={addData}>Add Data</button>
                </div>

                {/* LINE BREAK */}
                {/*<hr className='hidden lg:block lg:rotate-90 lg:w-1/4 lg:text-gray-400'/> */}
                {/* GRAPH */}

                <div className='bg-gray-100 w-auto lg:w-2/4 p-6 border-none rounded-2xl'>
                    <LineChart width={600} height={300} data={formData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
                        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="wgt" stroke="blue" strokeWidth={2} name="Weight tracker graph" />
                        <XAxis dataKey="date" />
                        <YAxis width="auto" label={{ value: 'weight', position: 'insideLeft', angle: -90 }} />
                        <Legend align="right" />
                        <Tooltip />
                    </LineChart>
                </div>

            </div>
            <div className='w-full flex items-center justify-center'>
                <Backbtn />
            </div>
        </div>
    )
}

export default WeightTracker;
