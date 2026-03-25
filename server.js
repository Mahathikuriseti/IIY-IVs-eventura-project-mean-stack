const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { checkReminders } = require("./utils/reminderService");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const eventRoutes = require("./routes/eventRoutes");

app.use("/api/events", eventRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const venueRoutes = require("./routes/venueRoutes");
app.use("/api/venues", venueRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Eventura API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Run reminder check every hour
  setInterval(checkReminders, 60 * 60 * 1000);
  // Initial check on start
  checkReminders();
});
