import React from 'react'

export default function Methodology() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      
      {/* Judul Halaman */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs text-sky-400 mb-3">
          Artificial Intelligence Coursework Integration
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Metodologi &amp; Landasan Kecerdasan Buatan
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
          Arsitektur penalaran probabilistik di bawah ketidakpastian (Reasoning under Uncertainty) yang diterapkan pada sistem pendukung keputusan mobilitas.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Modul 1: Bayesian Network */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20">
              Session 11
            </span>
            <h2 className="text-xl font-bold text-white">
              Bayesian Network: Exact Inference &amp; Variable Elimination
            </h2>
          </div>
          
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Sistem menggunakan Directed Acyclic Graph (DAG) untuk memodelkan probabilitas risiko keterlambatan mahasiswa ke kampus berdasarkan faktor cuaca ekstrem dan koridor kemacetan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                1. Rantai Kausalitas (DAG)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hujan Lebat (R) mempengaruhi Kemacetan Jalan (T), yang secara langsung mempengaruhi Mahasiswa Terlambat (L). Berdasarkan conditional independence, L independen terhadap R jika kondisi T telah teramati.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                2. Variable Elimination (VE)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mengurangi kompleksitas komputasi dengan mendorong operasi marginalisasi (sum-out) ke dalam perkalian faktor parsial, mencegah ledakan eksponensial dari tabel joint gabungan.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-sky-300 border border-slate-800/80 overflow-x-auto">
            {"P(Late | Rain, Traffic) = α · ∑ P(Rain) · P(Traffic | Rain) · P(Late | Traffic)"}
          </div>
        </div>

        {/* Modul 2: Markov Models */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
              Session 12
            </span>
            <h2 className="text-xl font-bold text-white">
              Markov Chain &amp; Hidden Markov Models (HMM)
            </h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Digunakan untuk memodelkan evolusi kondisi lalu lintas Jakarta yang berubah secara dinamis seiring pergantian jam sibuk (Rush Hours) perkuliahan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Markov Property (Memoryless)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Status kemacetan jalan pada langkah waktu berikutnya (t+1) hanya bergantung pada kondisi koridor saat ini (t) melalui matriks transisi stokastik T, tanpa dipengaruhi riwayat jam sebelumnya.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Forward Algorithm
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menghitung kemungkinan sekuens observasi kecepatan kendaraan nyata menggunakan dynamic programming dengan mengalikan akumulasi probabilitas transisi dan probabilitas emisi.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800/80 overflow-x-auto">
            {"X(t+1) = T · X(t)   |   α_t(j) = [∑ α_(t-1)(i) · a_ij] · b_j(y_t)"}
          </div>
        </div>

      </div>
    </div>
  )
}