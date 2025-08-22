import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import CarModel from "./models/Car.js";






const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));
dotenv.config();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, "../dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  });
}
// app.patch('/api/cars/:carNumber/obstacle-status', async (req, res) => {
//   const { carNumber} = req.params;
//   const { obstacleDetected } = req.body;

//   try {
//     // Replace this with your actual DB logic
//     await CarModel.findOneAndUpdate({ carNumber }, { obstacleDetected });

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update obstacle status' });
//   }
// });
app.patch('/api/cars/:carNumber/obstacle-status', async (req, res) => {
  const { carNumber } = req.params;
  const { obstacleDetected } = req.body;

  try {
    const result = await CarModel.findOneAndUpdate(
      { carNumber }, // match carNumber field
      { obstacleDetected }, // update this field
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({ success: true, updatedCar: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update obstacle status' });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;
