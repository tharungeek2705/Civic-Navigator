export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 flex flex-col items-center justify-center">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-6xl mb-4">
          Civic Navigator
        </h1>
        <p className="text-lg leading-8 text-slate-600 mb-8">
          AI-Powered Public Service Discovery Platform. Making public services accessible to everyone.
        </p>
        <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-500 transition-all">
          Get Started
        </button>
      </div>
    </main>
  );
}