const express = require('express');
const app = express();
const PORT = 3000;

require('dotenv').config(); 
const mongoUrl = process.env.MONGO_URL;
const cors = require('cors');
const mongoose = require('mongoose');

// ENABLE CORS AND JSON PARSING

app.use(cors());
app.use(express.json());

//MONGODB ATLAS CONNECT

const MONGO_URI = mongoUrl;

mongoose.connect(MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=> console.log('db connected')).catch((err)=> console.log('error in db connection'));

//SCHEMA DESIGN STUDENT

const studentSchema = new mongoose.Schema({
    _id : String,
    name : String,
    course : String,
    regno : Number
});

const Student = mongoose.model('Students', studentSchema, 'ruchinew001');  


//GET STUDENT

app.get('/students', async(req,res) => {
    try{
        const students = await Student.find();
        res.json(students);
    }catch(err){
        res.status(500).json({error: 'Error in fetching students'});
    }
});

// POST STUDENT

app.post('/students', async(req,res)=> {
    const {_id,name,course,regno} = req.body;

    if(!name || !course){
        return res.status(400).json({error :'Name and course are required'});
}
        try{
            const newStudent = new Student({_id,name,course,regno});
            const savedStudent = await newStudent.save();
            res.status(201).json(savedStudent); 
        }catch(err){
            res.status(500).json({error : 'Error saving data od student'});
        }
    
});


// SCHEMA DESIGN WEIGHT

const weightSchema = new mongoose.Schema({
    date : Date,
    wgt : Number,
});

const Weight = mongoose.model('Weight', weightSchema, 'weighttracker');  

//GET DATA

app.get('/wgt', async(req,res) => {
    try{
        const weight = await Weight.find();
        res.json(weight);
    }catch(err){
        res.status(500).json({error: 'Error in fetching data from server : GET'});
    }
});

// POST DATA

app.post('/wgt', async(req,res)=> {
    const {date, wgt} = req.body;

    if(!date || !wgt){
        return res.status(400).json({error :'Date and weight are required'});
}
        try{
            const newWeight = new Weight({date, wgt});
            const savedWeight = await newWeight.save();
            res.status(201).json(savedWeight); 
        }catch(err){
            res.status(500).json({error : 'Error saving data from backend to mongo'});
        }
    
});

// CONTACT FORM ===============================================

// SCHEMA DESIGN
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model('Contact', contactSchema, 'contactform'); // <-- Replace collection name

// GET CONTACTS (optional)
app.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching contact form data' });
    }
});

// POST CONTACT
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(500).json({ error: 'Error saving contact form data' });
    }
});


//LISTEN PORT

app.listen(PORT, ()=>{
    console.log(`server is running on PORT : ${PORT}`);
});
