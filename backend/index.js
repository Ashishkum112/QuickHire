import express, { application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { geminiApi } from './geminiApi.js'; // Import the AI service
import path from "path"
    
dotenv.config({});

const app = express();

const __dirname = path.resolve();
console.log(__dirname);


app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname, "frontend","dist", "index.html"));
})

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use('/api/v1/application', applicationRoute);

// AI route
app.post('/api/v1/generate-response', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const aiResponse = await geminiApi(userMessage);
        res.status(200).json({
            success: true,
            response: aiResponse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating AI response',
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
