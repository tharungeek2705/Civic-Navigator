export const DIGILOCKER_CONFIG = {
  clientId: "mock_client_id_789456",
  clientSecret: "mock_client_secret_super_secure",
  redirectUri: "http://localhost:3000/api/auth/callback",
  authEndpoint: "https://api.digitallocker.gov.in/public/oauth2/1/authorize",
  tokenEndpoint: "https://api.digitallocker.gov.in/public/oauth2/1/token",
};

/**
 * Constructs the standard OAuth2 authorization URL.
 * Redirects the user to the official DigiLocker consent screen.
 */
export function getDigilockerAuthUrl() {
  const state = `cnav_${Math.floor(Math.random() * 10000000000)}`;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: DIGILOCKER_CONFIG.clientId,
    redirect_uri: DIGILOCKER_CONFIG.redirectUri,
    state: state,
    scope: "org.nvsp.epic org.uidai.aadhaar",
  });
  
  return `${DIGILOCKER_CONFIG.authEndpoint}?${params.toString()}`;
}

/**
 * Simulates exchanging the authorization code for a Bearer Access Token.
 */
export async function exchangeCodeForToken(code) {
  // Simulating network latency for the POST request to the token endpoint
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log(`[DigiLocker Auth] Exchanged code: ${code.substring(0, 5)}... for token`);
  
  return {
    access_token: `mock_bearer_token_${Date.now()}`,
    expires_in: 3600,
    token_type: "Bearer"
  };
}

/**
 * Simulates fetching verified identity documents from DigiLocker using the token.
 */
export async function fetchUserDocuments(accessToken) {
  // Simulating network latency for the resource fetch
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log(`[DigiLocker Auth] Fetching docs with token: ${accessToken.substring(0, 10)}...`);

  return {
    documents: [
      {
        id: "uidai_aadhaar",
        type: "National Identity Document",
        name: "Aadhaar Card",
        issuer: "UIDAI",
        verifiedData: {
          documentNumber: "XXXX-XXXX-[Redacted]", // CRITICAL SECURITY RULE: Redacted
          status: "VERIFIED_ACTIVE"
        },
        issuedAt: new Date().toISOString()
      },
      {
        id: "income_cert",
        type: "Socio-Economic Document",
        name: "Income Certificate",
        issuer: "State Revenue Department",
        verifiedData: {
          documentNumber: "INC-XXXX-XXXX",
          status: "VERIFIED_ACTIVE"
        },
        issuedAt: new Date().toISOString()
      }
    ]
  };
}
