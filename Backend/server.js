const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const Task = require('./models/Task');
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb://localhost:27017/taskApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/tasks', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const newTask = new Task({
      name,
      image: req.file.path,
      image_status: 'uploaded',
      created_at: Date.now(),
      updated_at: Date.now()
    });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
