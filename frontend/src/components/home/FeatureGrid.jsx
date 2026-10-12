import React from 'react'

export default function FeatureGrid() {
  const features = [
    {
      icon: '🗺️',
      title: 'Topologi Jalur & Peta Real-Time',
      desc: 'Pilih titik asal langsung dari peta interaktif Leaflet atau cari lewat nama jalan. Sistem menarik garis rute nyata lengkap dengan estimasi jarak fisik.',
      borderHover: 'hover:border-sky-500/50'
    },
    {
      icon: '🚆',
      title: 'Integrasi Multimoda Nyata',
      desc: 'Bandingkan langsung opsi Motor, Mobil Pribadi, dan KRL Commuter Line. Memperhitungkan waktu cari parkir kampus hingga jalur transit kereta.',
      borderHover: 'hover:border-indigo-500/50'
    },
    {
      icon: '🌱',
      title: 'Kalkulasi Emisi Lingkungan',
      desc: 'Ketahui gram karbon CO₂ yang kamu hasilkan di setiap perjalanan dan pilih opsi transportasi paling ramah bagi lingkungan kota Jakarta.',
      borderHover: 'hover:border-emerald-500/50'
    }
  ]

  return (
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
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl bg-slate-900/70 border border-slate-800 transition-all flex flex-col justify-between ${f.borderHover}`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}