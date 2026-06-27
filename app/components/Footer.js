export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 pt-12 pb-8 print:hidden mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Identity */}
          <div>
            <span className="font-bold text-xl text-white tracking-tight flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center text-xs text-white">CN</div>
              Civic Navigator
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">
              An AI-powered public service discovery platform designed to bridge the gap between citizens and government welfare provisions through seamless demographic matching.
            </p>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="/dashboard" className="hover:text-indigo-400 transition flex items-center gap-2">Dashboard</a></li>
              <li><a href="/explore" className="hover:text-indigo-400 transition flex items-center gap-2">Global Scheme Directory</a></li>
              <li><a href="/csc-locator" className="hover:text-indigo-400 transition flex items-center gap-2">e-Sevai Locator</a></li>
              <li><a href="/vault" className="hover:text-indigo-400 transition flex items-center gap-2">Civic Vault e-KYC</a></li>
            </ul>
          </div>

          {/* Grievance & Queries Section (The Gmail Link) */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Grievance Redressal & Support</h3>
            <p className="text-sm text-slate-400 mb-5">
              Facing issues with document tokenization or scheme eligibility mapping? Submit a query to our technical support team.
            </p>
            
            {/* The actual mailto link that opens Gmail automatically */}
            <a 
              href="mailto:civicnavigator.support@gmail.com?subject=Grievance/Query:%20Civic%20Navigator" 
              className="inline-flex items-center gap-3 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 rounded-xl w-full justify-center md:justify-start hover:bg-emerald-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Email Support Desk
            </a>
          </div>

        </div>
        
        {/* Bottom Copyright & Hackathon Badge */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Civic Navigator. All rights reserved.</p>
          <p className="bg-slate-900 px-3 py-1 rounded-full border border-slate-800">Built for Smart India Hackathon</p>
        </div>
      </div>
    </footer>
  );
}
