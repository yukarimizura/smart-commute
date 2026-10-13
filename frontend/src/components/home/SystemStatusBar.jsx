import React, { useState, useEffect } from 'react'

export default function SystemStatusBar() {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider border-b border-slate-800/60 pb-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300">SYSTEM READY &bull; SMART COMMUTE OS</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-400">{timeStr || '00:00:00'} WIB</span>
        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-sky-400">
          v2.4 Core
        </span>
      </div>
    </div>
  )
}