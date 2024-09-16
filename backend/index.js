import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import aiRoute from './routes/ai.route.js';
import path from "path";
import axios from "axios";  // Import axios for self-pinging
import GoogleStrategy from 'passport-google-oauth20';  // Use the Google OAuth strategy
import session from "express-session";
import passport from "passport";
import {User} from './models/user.model.js';  // Import using ES modules
import MongoStore from 'connect-mongo';

const PORT = process.env.PORT || 3000;

// const clientid = process.env.GOOGLE_CLIENT_ID;
// const clientsecret = process.env.GOOGLE_CLIENT_SECRET;
 

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

// setup session
app.use(session({
    secret: process.env.SECRET_KEY,  // Ensure you're using an environment variable for the secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // Use your existing MongoDB connection
        collectionName: 'sessions'
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production",  // Secure cookies in production
    }
}));
// setup passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/api/v1/user/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile);
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = new User({
                fullname: profile.displayName,
                email: profile.emails[0].value,
                profilePicture: profile.photos[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use('/api/v1/application', applicationRoute);
app.use('/api/v1/generative-ai', aiRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Handle all other routes (wildcard) to serve the frontend app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});



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
