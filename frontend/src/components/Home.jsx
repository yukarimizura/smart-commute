import React from 'react'

export default function Home({ onStart }) {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Dynamic Multi-Color Ambient Glow (Dibuat tegas dan terang) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Glow Cyan / Sky (Kiri Atas) */}
        <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-cyan-500/25 blur-[100px]" />
        
        {/* Glow Ungu / Violet (Tengah Belakang Judul) */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-72 rounded-full bg-indigo-600/30 blur-[110px]" />
        
        {/* Glow Emerald / Hijau Neon (Kanan) */}
        <div className="absolute top-10 -right-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-[100px]" />

        {/* Glow Fuchsia / Pink (Bawah) */}
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      {/* Hero Content - Diberi z-10 agar berada di atas pendaran lampu */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center flex flex-col items-center justify-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 text-xs text-sky-400 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="font-medium tracking-wide">Decision Support System Berbasis Real-Time Telemetry</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight text-center">
          <span className="bg-gradient-to-r from-sky-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
            Navigasi Rute Cerdas
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-center font-normal">
          Bukan sekadar penunjuk arah biasa. Smart Commute DSS mengevaluasi rute jalan, satelit cuaca, risiko keterlambatan kelas, penalti parkir, hingga jejak emisi karbon untuk memberikan rekomendasi moda transportasi terbaik bagi mahasiswa.
        </p>

        {/* Tombol Aksi */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={onStart}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            Buka Simulasi Rute 🚀
          </button>
          <a
            href="https://github.com/yukarimizura/smart-commute"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all backdrop-blur-md"
          >
            Lihat Kode di GitHub ↗
          </a>
        </div>

        {/* Kartu Metrik dengan Pendaran Aksen Warna */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/40 shadow-lg shadow-sky-500/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-bold text-sky-400">
              TomTom &amp; OSRM
            </div>
            <div className="text-xs text-slate-400 mt-1">Live Traffic Geometries</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/40 shadow-lg shadow-indigo-500/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-bold text-indigo-400">
              Open-Meteo
            </div>
            <div className="text-xs text-slate-400 mt-1">Satelit Cuaca &amp; Hujan</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">
              Multi-Criteria
            </div>
            <div className="text-xs text-slate-400 mt-1">Evaluasi Waktu &amp; Emisi</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 shadow-lg shadow-amber-500/10 backdrop-blur-md text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-400">
              Driver Personas
            </div>
            <div className="text-xs text-slate-400 mt-1">Skill Sat-Set vs Normal</div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/80 flex flex-col items-center">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Fitur Utama Pengambil Keputusan
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Dirancang khusus untuk memecahkan dilema perjalanan harian mahasiswa komuter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between">
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

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between">
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

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
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