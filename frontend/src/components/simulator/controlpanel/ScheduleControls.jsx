import React from 'react'

export default function ScheduleControls({
  departureTime,
  setDepartureTime,
  targetArrivalTime,
  setTargetArrivalTime,
  dayType,
  setDayType
}) {
  return (
    <div className="space-y-2 pt-1">
      <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
        <span>⏰</span> Rencana Jadwal & Waktu
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-400">Jam Berangkat</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-slate-400">Target Tiba</label>
          <input
            type="time"
            value={targetArrivalTime}
            onChange={(e) => setTargetArrivalTime(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] text-slate-400">Tipe Hari</label>
        <select
          value={dayType}
          onChange={(e) => setDayType(e.target.value)}
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
        >
          <option value="weekday">Hari Kerja (Senin - Jumat)</option>
          <option value="weekend">Akhir Pekan (Sabtu - Minggu)</option>
          <option value="holiday">Hari Libur Nasional</option>
        </select>
      </div>
    </div>
  )
}