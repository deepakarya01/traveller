import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import placeRoute from "./routes/placeRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: "10mb",}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());

//Auth Routes
app.use('/api/auth', authRoute);

//Place Routes
app.use('/api/place', placeRoute);

//Booking Routes
app.use('/api/booking', bookingRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
   connectDb();
});