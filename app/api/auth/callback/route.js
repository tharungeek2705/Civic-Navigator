import { NextResponse } from "next/server";
import { exchangeCodeForToken, fetchUserDocuments } from "@/lib/digilocker";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      console.warn("[DigiLocker API] Missing OAuth code in callback.");
      return NextResponse.redirect(new URL("/vault?error=missing_code", request.url));
    }

    console.log(`[DigiLocker API] Callback received. State: ${state}`);

    // 1. Exchange the auth code for an Access Token
    const tokenResponse = await exchangeCodeForToken(code);
    
    // 2. Fetch the user's verified documents using the Token
    const documents = await fetchUserDocuments(tokenResponse.access_token);
    
    // 3. Security: We do NOT store these documents in a backend database (Zero-Retention)
    // We redirect the user back to the frontend vault with a success status.
    // In a real app, a secure encrypted session cookie would be set here.
    
    console.log("[DigiLocker API] Auth flow complete. Redirecting to Vault.");
    return NextResponse.redirect(new URL("/vault?status=verified", request.url));

  } catch (error) {
    console.error("[DigiLocker API] Callback error:", error);
    return NextResponse.redirect(new URL("/vault?error=auth_failed", request.url));
  }
}
