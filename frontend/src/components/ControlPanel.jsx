import { useState } from 'react'

export default function ControlPanel({ 
    originText,
    setOriginText,
    destText,
    setDestText,
    selectedMode, 
    setSelectedMode,
    driverSkill,
    setDriverSkill,
    departureTime,
    setDepartureTime,
    dayType,
    setDayType,
    targetArrivalTime,
    setTargetArrivalTime,
    onSearchOrigin,
    onSearchDest,
    onAnalyze, 
    loading 
}) {
    const [searchingOrigin, setSearchingOrigin] = useState(false)
    const [searchingDest, setSearchingDest] = useState(false)

    const handleOriginSubmit = async (e) => {
    e.preventDefault()
    setSearchingOrigin(true)
    await onSearchOrigin()
    setSearchingOrigin(false)
    }

    const handleDestSubmit = async (e) => {
    e.preventDefault()
    setSearchingDest(true)
    await onSearchDest()
    setSearchingDest(false)
    }

    return (
    <div className="bg-slate-900 border border-slate-800 p-5 md:p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full space-y-4">
        <div className="space-y-4">
        
        {/* Lokasi Asal */}
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            📍 Lokasi Asal (Kos / Rumah)
            </label>
            <div className="flex gap-2">
            <input
                type="text"
                value={originText}
                onChange={(e) => setOriginText(e.target.value)}
                placeholder="Contoh: Citra 2 Extension, Jakarta Barat..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs md:text-sm text-white outline-none focus:border-sky-500"
                onKeyDown={(e) => e.key === 'Enter' && handleOriginSubmit(e)}
            />
            <button
                type="button"
                onClick={handleOriginSubmit}
                disabled={searchingOrigin}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold text-sky-400 transition"
            >
                {searchingOrigin ? '...' : 'Cari'}
            </button>
            </div>
        </div>

        {/* Lokasi Tujuan */}
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            🎯 Lokasi Tujuan (Kampus)
            </label>
            <div className="flex gap-2">
            <input
                type="text"
                value={destText}
                onChange={(e) => setDestText(e.target.value)}
                placeholder="Contoh: BINUS Anggrek..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs md:text-sm text-white outline-none focus:border-sky-500"
                onKeyDown={(e) => e.key === 'Enter' && handleDestSubmit(e)}
            />
            <button
                type="button"
                onClick={handleDestSubmit}
                disabled={searchingDest}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 transition"
            >
                {searchingDest ? '...' : 'Cari'}
            </button>
            </div>
        </div>

        {/* Jadwal Perjalanan: Jam & Hari */}
        <div className="bg-slate-800/40 border border-slate-800 p-3.5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">⏱️ Rencana Jadwal</span>
            <select
                value={dayType}
                onChange={(e) => setDayType(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 outline-none"
            >
                <option value="weekday">Hari Kerja (Senin–Jumat)</option>
                <option value="weekend">Akhir Pekan (Sabtu–Minggu)</option>
                <option value="holiday">Hari Libur Nasional</option>
            </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="block text-[11px] text-slate-400 mb-1">Jam Berangkat</label>
                <input
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono outline-none focus:border-sky-500"
                />
            </div>
            <div>
                <label className="block text-[11px] text-slate-400 mb-1">Target Kelas / Tiba</label>
                <input
                type="time"
                value={targetArrivalTime}
                onChange={(e) => setTargetArrivalTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono outline-none focus:border-emerald-500"
                />
            </div>
            </div>
        </div>

        {/* Pilihan Moda & Persona Pengemudi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Moda Kendaraan
            </label>
            <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs md:text-sm outline-none focus:border-sky-500 text-white font-medium"
            >
                <option value="motorcycle">🏍️ Sepeda Motor</option>
                <option value="car">🚗 Mobil Pribadi</option>
                <option value="krl">🚆 KRL Commuter</option>
            </select>
            </div>

            <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Gaya Nyetir
            </label>
            <select
                value={driverSkill}
                onChange={(e) => setDriverSkill(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs md:text-sm outline-none focus:border-sky-500 text-amber-300 font-medium"
            >
                <option value="pro">⚡ Emak-Emak Pro (Sat-set)</option>
                <option value="normal">☕ Santai / Biasa Aja</option>
                <option value="beginner">🐢 Pemula (Hati-hati)</option>
            </select>
            </div>
        </div>

        </div>

        <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-sky-500/20 text-sm mt-3"
        >
        {loading ? 'Menganalisis Pola Kemacetan...' : 'Analisis Keputusan Berangkat'}
        </button>
    </div>
    )
}