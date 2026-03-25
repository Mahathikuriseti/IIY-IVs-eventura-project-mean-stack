async function testCreate() {
  try {
    const loginRes = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'organizer@test.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginRes.json();
    if (!loginRes.ok) {
        console.log("Login failed", loginData);
        return;
    }

    const payload = {
        title: "AI Hackathon",
        description: "Join us for an AI hackathon!",
        category: "Technical",
        department: "AIML",
        date: "2026-04-11",
        time: "09:30 AM",
        venue: "BB 102",
        capacity: 100,
        teamSize: 4,
        image: "https://example.com/image.jpg"
    };

    console.log("Sending event payload...");
    const req = await fetch('http://localhost:5001/api/events', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + loginData.token
      },
      body: JSON.stringify(payload)
    });

    const resBody = await req.json();
    console.log("Status:", req.status);
    console.log("Response:", resBody);

  } catch (err) {
    console.error(err);
  }
}
testCreate();
