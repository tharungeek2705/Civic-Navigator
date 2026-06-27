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
    <div className="relative inline-flex items-center group">
      {/* Premium UI/UX Globe Icon positioned absolutely */}
      <span className="absolute left-3 z-10 pointer-events-none text-slate-400 group-hover:text-indigo-400 transition-colors duration-300">
        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </span>

      <div id="google_translate_element" className="min-h-[38px] flex items-center"></div>
      
      {/* Skeleton fallback loader while Google API scripts execute */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-between pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur-md text-sm font-semibold text-slate-400 pointer-events-none h-[38px] box-sizing-border-box">
          <span>Language...</span>
          <svg className="w-4 h-4 text-indigo-400 animate-pulse ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
}
