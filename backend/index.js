import { config, parse } from 'dotenv'; 
import express from 'express'; 
import mongoose from 'mongoose';
import product_route  from "./routes/product_route.js"
import cors from "cors"
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/auth.js';
import AdminRoutes from './routes/admin_route.js';
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,              
  })
);
config();

const Port = process.env.PORT || 4000;
const URI=process.env.CONNECTMD


const connectDB = async () => {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); 
    }
  };

  connectDB();
  app.use(cookieParser())
  app.use(express.json())

//routes
app.use("/product",product_route);
app.use("/api/auth",AuthRoutes)
app.use('/api/admin',AdminRoutes)




app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
