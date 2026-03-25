const http = require('http');

const data = JSON.stringify({
  email: 'organizer@test.com',
  password: 'password123'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  console.log('STATUS:', res.statusCode);
  res.on('data', (chunk) => {
    console.log('BODY:', chunk.toString());
  });
});

req.on('error', (e) => {
  console.error('ERROR:', e.message);
});

req.write(data);
req.end();
