import { useState } from 'react'
import { ChevronDown, ArrowLeft, CheckCircle2 } from 'lucide-react'

// Dummy content: replace with real questions & answers later.
const faqs = [
  { q: 'When is the best time for a Ladakh bike trip?', a: 'The riding season runs from May to September. June to August has the most stable weather and open passes. Dates are only a placeholder here.' },
  { q: 'Do I need to bring my own motorcycle?', a: 'No. Well-maintained Royal Enfield bikes are available on rent as part of the package. You can also bring your own if you prefer.' },
  { q: 'Do I need a riding licence?', a: 'Yes. A valid two-wheeler driving licence is mandatory for all riders. Pillion riders do not need one.' },
  { q: 'How do you handle altitude sickness?', a: 'The itinerary includes acclimatisation days in Leh. We also carry oxygen cylinders and a first-aid kit, and our trip leaders are trained to spot early symptoms.' },
  { q: 'What is included in the trip price?', a: 'Accommodation, breakfast and dinner, bike rental, fuel guidance, permits, a backup vehicle and a trip leader. Flights and personal expenses are not included.' },
  { q: 'Are inner line permits arranged for us?', a: 'Yes. We apply for all required permits for Nubra, Pangong and other restricted areas. You only need to share your ID documents in advance.' },
  { q: 'How big are the groups?', a: 'Group rides usually have 8 to 15 riders, with a lead rider and a sweep rider at the back. Custom rides can be as small as two people.' },
  { q: 'What is the cancellation policy?', a: 'Free cancellation is available up to 30 days before departure. After that, charges apply on a sliding scale. The full policy is shared at booking.' },
  { q: 'Can I pay in instalments or EMI?', a: 'Yes. A small booking amount confirms your seat, and the balance can be paid in instalments or through no-cost EMI options.' },
  { q: 'What happens if my bike breaks down?', a: 'A backup vehicle and a mechanic travel with the group. If a bike cannot be fixed on the road, we swap it for a spare at the next stop.' },
]

export default function FaqPanel({ name, onBack }) {
  const [open, setOpen] = useState(0)
  const firstName = name?.trim().split(' ')[0]

  return (
    <div className="rounded-3xl bg-white p-5 shadow-2xl shadow-black/40 sm:p-7 xl:p-8">
      <div className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">
            Thanks{firstName ? `, ${firstName}` : ''}! We’ve received your enquiry.
          </span>{' '}
          Our trip experts will contact you shortly. Meanwhile, here are answers to common questions.
        </p>
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">Frequently asked questions</h2>

      <ul className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
        {faqs.map(({ q, a }, i) => {
          const isOpen = open === i
          return (
            <li key={q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  <span className={`text-sm font-semibold sm:text-base ${isOpen ? 'text-brand-700' : 'text-slate-900'}`}>
                    {q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-600' : ''}`}
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 pr-8 text-sm leading-relaxed text-slate-600">{a}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={onBack}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Edit my enquiry
      </button>
    </div>
  )
}