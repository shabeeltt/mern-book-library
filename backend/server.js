import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();
import bookRoute from "./routes/book.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = ["http://localhost:5175"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigin.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json()); // allow us to accept json data in the request body

app.use("/api/books", bookRoute); // middleware for the routes

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}/`);
});
