
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'

const packages = [
  'Delhi Manali Leh Srinagar 12D',
  'Srinagar Leh Manali Delhi 12D',
  'Delhi Manali Leh Delhi 12D',
  'Leh to Leh 8D',
  'Leh to Leh 7D',
]

const ridingOptions = [
  'Solo Rider',
  'Dual Rider',
  'Seat In Coach (SIC)',
  'Bring Your Own Bike (BYOB)',
]

const travellers = [
  '1', '2', '3', '4', '5', '6',
  '7', '8', '9', '10', '10+',
]

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20'

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

export default function EnquiryForm({ onSuccess, initialValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues || {},
  })

  const onSubmit = async (data) => {
    // Zoho API integration will be added here.
    console.log('Enquiry:', data)
    onSuccess?.(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl bg-white p-5 shadow-2xl shadow-black/40 sm:p-7 xl:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-900">
        Plan my trip
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Fill in your details and our trip experts will get in touch with you shortly.
      </p>

      <div className="mt-5 grid gap-x-7 gap-y-5 md:grid-cols-2">

        {/* Column 1 */}
        <div className="space-y-5">
          <p className="border-b border-slate-100 pb-1 text-xs font-bold text-brand-700">
            Your details
          </p>

          <Field label="Name" required error={errors.name?.message}>
            <input
              type="text"
              autoComplete="name"
              className={inputCls}
              placeholder="John Doe"
              {...register('name', {
                required: 'Enter your name',
              })}
            />
          </Field>

          <Field
            label="WhatsApp Number"
            required
            error={errors.whatsapp?.message}
          >
            <div className="flex">
              <span className="flex items-center rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 px-3 text-sm text-slate-600">
                +91
              </span>

              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel-national"
                className={`${inputCls} rounded-l-none`}
                placeholder="98765 43210"
                {...register('whatsapp', {
                  required: 'Enter your WhatsApp number',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Enter a valid 10-digit number',
                  },
                })}
              />
            </div>
          </Field>

          <Field label="Email ID" required error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              className={inputCls}
              placeholder="john.doe@email.com"
              {...register('email', {
                required: 'Enter your email address',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </Field>
        </div>

        {/* Column 2 */}
        <div className="space-y-5">
          <p className="border-b border-slate-100 pb-1 text-xs font-bold text-brand-700">
            Trip preferences
          </p>

          <Field
            label="Number of Travellers"
            required
            error={errors.travellers?.message}
          >
            <select
              defaultValue=""
              className={inputCls}
              {...register('travellers', {
                required: 'Select number of travellers',
              })}
            >
              <option value="" disabled>
                Select travellers
              </option>

              {travellers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Which Package You Wanna Do?"
            required
            error={errors.package?.message}
          >
            <select
              defaultValue=""
              className={inputCls}
              {...register('package', {
                required: 'Select your package',
              })}
            >
              <option value="" disabled>
                Select package
              </option>

              {packages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="How Do You Want to Ride?"
            required
            error={errors.ridingPreference?.message}
          >
            <select
              defaultValue=""
              className={inputCls}
              {...register('ridingPreference', {
                required: 'Select your riding preference',
              })}
            >
              <option value="" disabled>
                Select riding preference
              </option>

              {ridingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] text-slate-500">
        By submitting, you agree to our{' '}
        <a href="#" className="font-semibold text-brand-700">
          Privacy Policy
        </a>. We’ll never spam you.
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
