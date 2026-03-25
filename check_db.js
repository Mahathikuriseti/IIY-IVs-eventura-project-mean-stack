const mongoose = require('mongoose');

async function checkDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/eventura');
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({ role: 'organizer' }).toArray();
  console.log("Organizer users:", JSON.stringify(users, null, 2));
  process.exit(0);
}

checkDB();
