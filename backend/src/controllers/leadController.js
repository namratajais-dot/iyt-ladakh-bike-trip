
import { createZohoLead } from '../services/zohoService.js'

export async function submitLead(req, res) {
  try {
    const {
      name,
      whatsapp,
      email,
      travellers,
      package: selectedPackage,
      ridingPreference,
    } = req.body

    // Create lead in Zoho CRM
    const result = await createZohoLead({
      name,
      whatsapp,
      email,
      travellers,
      package: selectedPackage,
      ridingPreference,
    })

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully!',
      leadId: result.leadId,
    })
  } catch (error) {
    console.error('Lead submission error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your enquiry right now. Please try again.',
    })
  }
}