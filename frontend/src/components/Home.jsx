import React from 'react'

export default function Home({ onStart }) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center flex flex-col items-center justify-center">
        {/* Glow Background Effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[280px] bg-sky-600/15 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 text-xs text-sky-400 shadow-sm backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Decision Support System Berbasis Real-Time Telemetry
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight text-center">
          Navigasi Rute Cerdas
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed text-center">
          Bukan sekadar penunjuk arah biasa. Smart Commute DSS mengevaluasi rute jalan, satelit cuaca, risiko keterlambatan kelas, penalti parkir, hingga jejak emisi karbon untuk memberikan rekomendasi moda transportasi terbaik bagi mahasiswa.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={onStart}
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-indigo-500 transition-all hover:scale-105 active:scale-95"
          >
            Buka Simulasi Rute 🚀
          </button>
          <a
            href="https://github.com/yukarimizura/smart-commute"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all"
          >
            Lihat Kode di GitHub ↗
          </a>
        </div>

        {/* Metric Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-center">
            <div className="text-xl sm:text-2xl font-bold text-sky-400">TomTom &amp; OSRM</div>
            <div className="text-xs text-slate-400 mt-1">Live Traffic Geometries</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-center">
            <div className="text-xl sm:text-2xl font-bold text-indigo-400">Open-Meteo</div>
            <div className="text-xs text-slate-400 mt-1">Satelit Cuaca &amp; Hujan</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">Multi-Criteria</div>
            <div className="text-xs text-slate-400 mt-1">Evaluasi Waktu, Biaya &amp; Emisi</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-400">Driver Personas</div>
            <div className="text-xs text-slate-400 mt-1">Skill Sat-Set vs Normal</div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/60 flex flex-col items-center">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Fitur Utama Pengambil Keputusan
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Dirancang khusus untuk memecahkan dilema perjalanan harian mahasiswa komuter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-2xl mb-4">
                🗺️
              </div>
              <h3 className="text-lg font-semibold text-white">Topologi Jalur &amp; Peta Real-Time</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Pilih titik asal langsung dari peta interaktif Leaflet atau cari lewat nama jalan. Sistem menarik garis rute nyata lengkap dengan estimasi jarak fisik.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl mb-4">
                🚆
              </div>
              <h3 className="text-lg font-semibold text-white">Integrasi Multimoda Nyata</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Bandingkan langsung opsi Motor, Mobil Pribadi, dan KRL Commuter Line. Memperhitungkan waktu cari parkir kampus hingga jalur transit kereta.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-4">
                🌱
              </div>
              <h3 className="text-lg font-semibold text-white">Kalkulasi Emisi Lingkungan</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Ketahui gram karbon CO₂ yang kamu hasilkan di setiap perjalanan dan pilih opsi transportasi paling ramah bagi lingkungan kota Jakarta.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}