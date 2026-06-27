import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <body className="bg-slate-950 text-slate-50 min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        
        {/* This flex-grow ensures the main content pushes the footer to the bottom */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
