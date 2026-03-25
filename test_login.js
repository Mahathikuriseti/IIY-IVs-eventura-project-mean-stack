async function testLogin() {
  try {
    console.log("Registering organizer...");
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Organizer',
        email: 'organizer@test.com',
        password: 'password123',
        role: 'organizer'
      })
    });
    
    if (!regRes.ok && regRes.status !== 400 && regRes.status !== 409) {
      const errText = await regRes.text();
      console.error("Register error:", regRes.status, errText);
    } else {
      console.log("User might already exist, proceeding to login.");
    }

    console.log("Logging in...");
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'organizer@test.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginRes.json();
    if (!loginRes.ok) {
      console.error("Login Error:", loginRes.status, loginData);
    } else {
      console.log("Login successful!", loginData);
      
      console.log("Testing organizer venue fetch...");
      const venueRes = await fetch('http://localhost:5000/api/venues', {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      const venueData = await venueRes.json();
      if (!venueRes.ok) {
        console.error("Venue fetch error:", venueRes.status, venueData);
      } else {
        console.log("Venue fetch successful!", venueData);
      }
    }
  } catch (err) {
    console.error("Network or parsing error:", err.message);
  }
}

testLogin();
