import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import aiRoute from './routes/ai.route.js'
import path from "path";
import axios from "axios";  // Import axios for self-pinging

dotenv.config();
const app = express();

const __dirname = path.resolve();
console.log(__dirname);

// CORS configuration
const corsOptions = {
    origin: process.env.URL,
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use('/api/v1/application', applicationRoute);
app.use('/api/v1/generative-ai', aiRoute)

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Handle all other routes (wildcard) to serve the frontend app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT =  3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});

// Keep-alive pinging
setInterval(() => {
    axios.get(`https://job-portal-7iyl.onrender.com`)
        .then(response => {
            console.log('Keep-alive ping successful');
        })
        .catch(error => {
            console.error('Keep-alive ping failed:', error.message);
        });
}, 5 * 60 * 1000);  // Ping every 5 minutes
