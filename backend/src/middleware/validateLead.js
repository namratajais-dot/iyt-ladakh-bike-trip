
const ALLOWED_PACKAGES = [
  'Delhi Manali Leh Srinagar 12D',
  'Srinagar Leh Manali Delhi 12D',
  'Delhi Manali Leh Delhi 12D',
  'Leh to Leh 8D',
  'Leh to Leh 7D',
]

const ALLOWED_RIDING_PREFERENCES = [
  'Solo Rider',
  'Dual Rider',
  'Seat In Coach (SIC)',
  'Bring Your Own Bike (BYOB)',
]

export function validateLead(req, res, next) {
  const {
    name,
    whatsapp,
    email,
    travellers,
    package: selectedPackage,
    ridingPreference,
  } = req.body || {}

  const errors = {}

  // Name validation
  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    name.trim().length > 100
  ) {
    errors.name = 'Please enter a valid name.'
  }

  // WhatsApp number validation (Indian mobile number)
  if (
    typeof whatsapp !== 'string' ||
    !/^[6-9]\d{9}$/.test(whatsapp.trim())
  ) {
    errors.whatsapp = 'Please enter a valid 10-digit WhatsApp number.'
  }

  // Email validation
  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.email = 'Please enter a valid email address.'
  }

  // Number of travellers
  const validTravellers =
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+']

  if (
    !validTravellers.includes(String(travellers))
  ) {
    errors.travellers = 'Please select a valid number of travellers.'
  }

  // Package validation
  if (!ALLOWED_PACKAGES.includes(selectedPackage)) {
    errors.package = 'Please select a valid package.'
  }

  // Riding preference validation
  if (!ALLOWED_RIDING_PREFERENCES.includes(ridingPreference)) {
    errors.ridingPreference = 'Please select a valid riding preference.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please check the submitted form details.',
      errors,
    })
  }

  // Continue to the controller
  next()
}