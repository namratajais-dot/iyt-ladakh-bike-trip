
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'

import leadRoutes from './routes/leadRoutes.js'

dotenv.config()

const app = express()

// Security headers
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))

// Parse JSON request bodies
app.use(express.json({ limit: '10kb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ladakh Bike Trip API is running',
  })
})

// Lead submission routes
app.use('/api/leads', leadRoutes)

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
