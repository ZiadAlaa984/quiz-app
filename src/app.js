import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/auth.route.js";    
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// create schema for user
// create controller for user


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth/", authRoutes);


app.use(errorHandler);


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

