import { NextResponse } from "next/server";
import { getDigilockerAuthUrl } from "@/lib/digilocker";

export async function GET() {
  try {
    const authUrl = getDigilockerAuthUrl();
    
    // In a real application, you would log the state to a database or HTTP-only cookie here
    console.log("[DigiLocker API] Initiating OAuth2 redirect to consent screen.");
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("[DigiLocker API] Error initiating auth:", error);
    return NextResponse.json({ error: "Failed to initiate DigiLocker Auth" }, { status: 500 });
  }
}
