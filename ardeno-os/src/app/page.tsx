export default function Home() {
  return (
    <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a40_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <main className="relative z-10 max-w-4xl w-full text-center space-y-12 animate-in fade-in duration-1000">
        {/* Logo Section */}
        <div className="space-y-4">
          <div className="inline-block p-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-[0_0_40px_rgba(79,70,229,0.3)]">
            <div className="bg-[#050510] px-8 py-3 rounded-xl hover:bg-black/50 transition-colors">
              <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                ARDENO <span className="text-indigo-500 italic">OS</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg font-medium tracking-tight">
            Sentient Agency Operating System
          </p>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 translate-y-2 opacity-90">
          {[
            { label: 'Agency Status', value: 'ACTIVE', color: 'text-emerald-400' },
            { label: 'Neural Pool', value: '150 Keys', color: 'text-indigo-400' },
            { label: 'Real-time Stream', value: 'LIVE', color: 'text-sky-400' },
            { label: 'Memory Bank', value: 'Synced', color: 'text-purple-400' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
              <p className={`font-bold tracking-tight ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Launch Core Dashboard
          </a>
          <a
            href="https://github.com/Cookie-Cat21/Ardeno-OS-Sentient-Agency"
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-md"
          >
            View Infrastructure
          </a>
        </div>

        {/* Footer Meta */}
        <p className="text-gray-600 text-sm">
          Node-22 Edge Runtime • Built for Ardeno Studio © 2026
        </p>
      </main>
    </div>
  );
}
