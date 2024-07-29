import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";
import path from "path"
import { fileURLToPath } from 'url';
const app = express();

dotenv.config({ path: "./config/config.env" });

// Allowed origins array
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173" // Add any other allowed origins here
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
const staticPath = path.join(__dirname, './Frontend/dist');

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

app.get('*' , function(req,res){
    res.sendFile(path.join(__dirname, './Frontend/dist/index.html'));
})

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
