import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors";
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
dotenv.config();
import { connectDB } from "./config/dbConfig.js"


// Local Imports
import { errorHandler } from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import shopOwnerRoutes from "./routes/shopOwnerRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import shopRoutes from "./routes/shopRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import chatBotRoutes from "./routes/chatBotRoutes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// DB Connection
connectDB()

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "..", "uploads")
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

// Body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// CORS - allow dev (vite) and production (same-origin in monolithic deploy)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
]
if (process.env.RENDER_EXTERNAL_URL) {
  allowedOrigins.push(process.env.RENDER_EXTERNAL_URL)
}
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/shop-owner", shopOwnerRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/shops", shopRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/chat", chatBotRoutes)

// Health check for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

// Serve static files from React build in production
const clientDistPath = path.join(__dirname, "..", "client", "dist")
if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath))
    // For any non-API route, serve index.html (React Router handles it)
    app.get("{*path}", (req, res) => {
        res.sendFile(path.join(clientDistPath, "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "WELCOME TO INDORE BAZAR API 1.00 - Run 'npm run build' to build the client"
        })
    })
}

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black))