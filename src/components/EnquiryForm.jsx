import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Users, Route, CalendarDays, CheckCircle2 } from 'lucide-react'

const months = [
  'May 2027', 'June 2027', 'July 2027', 'August 2027', 'September 2027', 'Flexible',
]

const tripTypes = [
  { value: 'group', icon: Users, title: 'Group Ride', text: 'Ride with like-minded people' },
  { value: 'custom', icon: Route, title: 'Custom Ride', text: 'My dates, my pace, my way' },
]

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20'

const MIN = 5000
const MAX = 100000

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { tripType: 'group', budget: 50000 } })

  const tripType = watch('tripType')
  const budget = Number(watch('budget'))
  const fill = ((budget - MIN) / (MAX - MIN)) * 100

  const onSubmit = async (data) => {
    // TODO: replace with a POST to our serverless API (/api/lead) later.
    await new Promise((r) => setTimeout(r, 800))
    console.log('Enquiry:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-2xl">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-600" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">We got your details</h2>
        <p className="mt-2 text-sm text-slate-500">
          Our trip experts will contact you shortly.
        </p>
        <button
          onClick={() => { reset(); setSubmitted(false) }}
          className="mt-6 text-sm font-semibold text-brand-700 hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl bg-white p-5 shadow-2xl shadow-black/40 sm:p-7 xl:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-900">Plan my trip</h2>
      <p className="mt-1 text-sm text-slate-500">
        Fill in your details and our trip experts will get in touch with you shortly.
      </p>

      {/* Trip type */}
      <p className="mb-2 mt-5 text-xs font-bold text-brand-700">Trip type</p>
      <div className="grid grid-cols-2 gap-3">
        {tripTypes.map(({ value, icon: Icon, title, text }) => (
          <label
            key={value}
            className={`flex cursor-pointer flex-col items-center rounded-xl border px-2 py-3 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 ${
              tripType === value
                ? 'border-brand-600 bg-brand-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input type="radio" value={value} {...register('tripType')} className="sr-only" />
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              <Icon className="h-4 w-4 text-brand-600" /> {title}
            </span>
            <span className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">{text}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-x-7 gap-y-5 md:grid-cols-2">
        {/* Column 1 */}
        <div className="space-y-3.5">
          <p className="border-b border-slate-100 pb-1 text-xs font-bold text-brand-700">Your details</p>

          <Field label="Full name" required error={errors.name?.message}>
            <input
              className={inputCls}
              placeholder="John Doe"
              {...register('name', { required: 'Enter your name' })}
            />
          </Field>

          <Field label="Phone number" required error={errors.phone?.message}>
            <div className="flex">
              <span className="flex items-center rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 px-3 text-sm text-slate-600">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className={`${inputCls} rounded-l-none`}
                placeholder="98765 43210"
                {...register('phone', {
                  required: 'Enter your phone number',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' },
                })}
              />
            </div>
          </Field>

          <Field label="Email address" error={errors.email?.message}>
            <input
              type="email"
              className={inputCls}
              placeholder="john.doe@email.com"
              {...register('email', {
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />
          </Field>

          <Field label="Travel month" required error={errors.month?.message}>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                className={`${inputCls} pl-9`}
                defaultValue=""
                {...register('month', { required: 'Select a month' })}
              >
                <option value="" disabled>Select a month</option>
                {months.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </Field>
        </div>

        {/* Column 2 */}
        <div className="space-y-3.5">
          <p className="border-b border-slate-100 pb-1 text-xs font-bold text-brand-700">Trip preferences</p>

          <Field label="No. of travellers" required error={errors.travellers?.message}>
            <input
              type="number"
              min={1}
              max={50}
              className={inputCls}
              placeholder="2"
              {...register('travellers', {
                required: 'Enter number of travellers',
                min: { value: 1, message: 'At least 1 traveller' },
              })}
            />
          </Field>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">Budget per person</label>
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-3">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-brand-700">
                  ₹{budget.toLocaleString('en-IN')}{budget === MAX && '+'}
                </span>
                <span className="text-[11px] text-slate-500">Slide to adjust</span>
              </div>
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={5000}
                className="range-blue mt-3 w-full"
                style={{
                  background: `linear-gradient(to right, #2f62f0 ${fill}%, #d5dbe6 ${fill}%)`,
                }}
                {...register('budget')}
              />
              <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                <span>₹5k</span><span>₹30k</span><span>₹60k</span><span>₹1L+</span>
              </div>
            </div>
          </div>

          <Field label="Anything specific in mind?">
            <textarea
              rows={3}
              className={`${inputCls} resize-none`}
              placeholder="e.g. riding solo, need bike rental, want Pangong & Nubra..."
              {...register('message')}
            />
          </Field>
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] text-slate-500">
        By submitting, you agree to our{' '}
        <a href="#" className="font-semibold text-brand-700">Privacy Policy</a>. We’ll never spam you.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/40 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? 'Sending…' : 'Plan my trip'}
      </button>
    </form>
  )
}