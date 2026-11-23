
import express from 'express'
import { submitLead } from '../controllers/leadController.js'
import { validateLead } from '../middleware/validateLead.js'

const router = express.Router()

// POST /api/leads - Submit a new enquiry
router.post('/', validateLead, submitLead)

export default router