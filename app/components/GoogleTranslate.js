"use client";

import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only inject script once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ta,hi,te,ml,kn",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setIsLoaded(true);
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative inline-block group">
      <div id="google_translate_element" className="min-w-[140px]"></div>
      
      {/* Skeleto/fallback loader while google injects the real DOM */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-between px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-md text-sm font-semibold text-slate-400 pointer-events-none">
          <span>Language...</span>
          <svg className="w-4 h-4 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
}
