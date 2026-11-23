
const ACCOUNTS_URL =
  process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in'

let cachedAccessToken = null
let tokenExpiresAt = 0
let refreshPromise = null

export async function getZohoAccessToken() {
  // Reuse the existing token if it is still valid.
  // Refresh 60 seconds before its actual expiry.
  if (
    cachedAccessToken &&
    Date.now() < tokenExpiresAt - 60_000
  ) {
    return cachedAccessToken
  }

  // Prevent multiple simultaneous requests from refreshing
  // the token at the same time.
  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    const clientId = process.env.ZOHO_CLIENT_ID
    const clientSecret = process.env.ZOHO_CLIENT_SECRET
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing Zoho OAuth credentials in .env')
    }

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    })

    const response = await fetch(
      `${ACCOUNTS_URL}/oauth/v2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      }
    )

    const data = await response.json()

    if (!response.ok || !data.access_token) {
      throw new Error(
        `Zoho token refresh failed: ${data.error || response.status}`
      )
    }

    cachedAccessToken = data.access_token

    const expiresIn = Number(data.expires_in) || 3600

    tokenExpiresAt = Date.now() + expiresIn * 1000

    console.log('Zoho access token refreshed successfully')

    return cachedAccessToken
  })()

  try {
    return await refreshPromise
  } finally {
    refreshPromise = null
  }
}