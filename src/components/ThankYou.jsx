
import { CheckCircle2 } from 'lucide-react'

export default function ThankYou({ name, onBack }) {
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-2xl shadow-black/40 sm:p-10">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      </div>

      <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
        Thank You{name ? `, ${name.split(' ')[0]}` : ''}!
      </h2>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
        Your Ladakh Bike Trip 2027 enquiry has been received successfully.
        Our trip experts will get in touch with you shortly.
      </p>

      <div className="mt-6 w-full rounded-xl border border-brand-100 bg-brand-50 p-4">
        <p className="text-sm font-semibold text-brand-700">
          Your adventure awaits!
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Get ready for an unforgettable journey through the mountains.
        </p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-7 rounded-xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110"
      >
        Back to Home
      </button>
    </div>
  )
}