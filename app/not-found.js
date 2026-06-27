import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#0a0f1d] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#0a0f1d] to-[#040815] text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8 antialiased relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg text-center space-y-8">
        {/* Large 404 Display */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 select-none">
            404
          </h1>
          {/* Overlay glow text */}
          <h2 className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-indigo-400/60 to-indigo-600/20 select-none pointer-events-none">
            404
          </h2>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Page Not Found
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            This scheme or page couldn&apos;t be found. The resource may have been moved, deleted, or you may have entered an incorrect URL.
          </p>
        </div>

        {/* Error Details Box */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl font-mono text-[10px] text-slate-600 space-y-1 max-w-xs mx-auto">
          <div>STATUS: HTTP 404 NOT_FOUND</div>
          <div>GATEWAY: civic-navigator.internal</div>
          <div>TIMESTAMP: {new Date().toISOString().split("T")[0]}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_5px_15px_rgba(79,70,229,0.2)] flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Dashboard
          </Link>
          <Link
            href="/"
            className="px-5 py-3.5 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition"
          >
            Start Over
          </Link>
        </div>
      </div>
    </main>
  );
}
