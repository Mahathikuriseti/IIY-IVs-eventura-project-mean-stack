const mongoose = require('mongoose');

async function checkDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/eventura');
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({ role: 'organizer' }).toArray();
  users.forEach(u => {
    console.log(`Email: ${u.email}, Role: '${u.role}', Pwd: ${u.password ? (u.password.startsWith('$2') ? 'hash' : 'plaintext') : 'missing'}`);
  });
  process.exit(0);
}

checkDB();
