import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

// Setup Outfit font globally
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Civic Navigator",
  description: "Next-generation AI welfare discovery platform.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`font-sans bg-slate-950 text-slate-50 min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
