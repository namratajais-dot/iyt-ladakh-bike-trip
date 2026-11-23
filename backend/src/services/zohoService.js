
import { getZohoAccessToken } from '../config/zoho.js'

const ZOHO_API_DOMAIN =
  process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'

export async function createZohoLead(leadData) {
  const accessToken = await getZohoAccessToken()

  const lead = {
    Last_Name: leadData.name.trim(),
    Email: leadData.email.trim(),
    Phone: leadData.whatsapp.trim(),
    Lead_Source: 'Website',
    Description: [
      `Number of Travellers: ${leadData.travellers}`,
      `Package: ${leadData.package}`,
      `Riding Preference: ${leadData.ridingPreference}`,
    ].join('\n'),
  }

  const response = await fetch(
    `${ZOHO_API_DOMAIN}/crm/v8/Leads`,
    {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [lead],
        trigger: ['workflow'],
      }),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    console.error('Zoho API HTTP error:', response.status, result)
    throw new Error('Unable to submit enquiry to Zoho CRM')
  }

  const recordResult = result.data?.[0]

  if (
    recordResult?.status !== 'success' ||
    !recordResult?.details?.id
  ) {
    console.error('Zoho lead creation failed:', result)
    throw new Error(
      recordResult?.message || 'Zoho could not create the lead'
    )
  }

  return {
    success: true,
    leadId: recordResult.details.id,
  }
}