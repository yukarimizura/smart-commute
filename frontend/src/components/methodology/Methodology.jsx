import React from 'react'
import MarkovSection from './MarkovSection'
import HmmSection from './HmmSection'
import EvaluationSteps from './EvaluationSteps'

export default function Methodology() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Metodologi Kecerdasan Buatan &amp; Probabilitas
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Landasan teori matematis yang digunakan oleh engine Smart Commute DSS.
        </p>
      </div>

      <div className="space-y-6">
        <MarkovSection />
        <HmmSection />
        <EvaluationSteps />
      </div>
    </div>
  )
}