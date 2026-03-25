const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/eventura');
    const email = "organizer@test.com";
    const password = "password123";
    
    const user = await User.findOne({ email });
    console.log("Found user?", !!user);
    if (!user) {
      console.log("User not found");
      process.exit();
    }
    
    console.log("user.password:", user.password, "type:", typeof user.password);
    
    const isBcryptHash = (value) => typeof value === "string" && /^\$2[aby]\$\d{2}\$/.test(value);
    
    let isMatch = false;
    if (isBcryptHash(user.password)) {
      console.log("Password is a hashed bcrypt string");
      isMatch = await bcrypt.compare(password, user.password);
    } else if (typeof user.password === "string") {
      console.log("Password is a plaintext string");
      isMatch = password === user.password;
    } else {
      console.log("Password is of unknown type/format");
    }
    
    console.log("isMatch?", isMatch);
  } catch(err) {
    console.error("Detailed Error:", err);
  }
  process.exit();
}

test();
