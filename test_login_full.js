require('dotenv').config();
const mongoose = require('mongoose');
const authController = require('./controllers/authController');

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const req = {
    body: {
      email: 'organizer@test.com',
      password: 'password123'
    }
  };
  
  const res = {
    status: (code) => {
      console.log("Response Status:", code);
      return res;
    },
    json: (data) => {
      console.log("Response JSON:", data);
      return res;
    }
  };
  
  await authController.login(req, res);
  process.exit();
}

test();
