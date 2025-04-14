import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import bookRoute from "./routes/book.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow us to accept json data in the request body

app.use("/api/books", bookRoute); // middleware for the routes

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}/`);
});
