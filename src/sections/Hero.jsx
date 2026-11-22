import { motion } from 'framer-motion'
import { Star, Users, ShieldCheck, Sparkles } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

// Placeholder numbers: replace with real figures / brand logos later.
const highlights = [
  { icon: Star, title: '4.9 Rating', text: '8,500+ verified reviews' },
  { icon: Users, title: '570k+ Community', text: '35k+ happy travellers' },
  { icon: ShieldCheck, title: 'Book with Confidence', text: 'Free cancellation · EMI' },
]

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      {/* Soft blue glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 -top-48 h-[620px] w-[620px] rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="absolute -bottom-56 -left-48 h-[520px] w-[520px] rounded-full bg-brand-500/15 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1520px] flex-1 flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <header className="border-b border-line py-4 lg:py-5">
          <span className="text-2xl font-extrabold tracking-tight">
            IYT<span className="text-brand-400">.</span>
          </span>
        </header>

        <div className="grid flex-1 content-center gap-10 lg:items-start py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:py-10 xl:gap-20">
          {/* Left: headline + trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl xl:text-6xl">
              Ladakh Bike Trip 2027
              <span className="block text-brand-400">is calling.</span>
              <span className="flex items-center gap-3">
                Will you answer?
                {/* <Sparkles className="h-6 w-6 shrink-0 text-brand-400 xl:h-7 xl:w-7" /> */}
              </span>
            </h1>
            <p className="mt-4 text-sm font-medium text-slate-300 sm:text-base">
              Where every mountain tells a story.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-panel p-3"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight sm:text-base">{title}</p>
                    <p className="text-xs text-slate-400 sm:text-sm">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Notch on the card edge (desktop only) */}
            <div className="absolute -left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink lg:flex">
              <span className="h-4 w-1 rounded-full bg-white" />
            </div>
            <EnquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}