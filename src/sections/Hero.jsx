import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import FaqPanel from '../components/FaqPanel'

// Logos: replace the files in src/assets/images (keep the same file names)
import googleLogo from '../assets/images/google.svg'
import instagramLogo from '../assets/images/instagram.svg'
import confidenceLogo from '../assets/images/confidence.svg'

// Placeholder numbers: replace with real figures.
const highlights = [
  { logo: googleLogo, alt: 'Google', title: '4.9 Rating', text: '8,500+ verified reviews' },
  { logo: instagramLogo, alt: 'Instagram', title: '570k+ Community', text: '35k+ happy travellers' },
  { logo: confidenceLogo, alt: 'Secure booking', title: 'Book with Confidence', text: 'Free cancellation · EMI' },
]

const swap = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25 },
}

export default function Hero() {
  const [step, setStep] = useState('form') // 'form' | 'faq'
  const [lead, setLead] = useState(null)
  const cardRef = useRef(null)

  const goTo = (next) => {
    setStep(next)
    // On phones/tablets the card sits below the headline, so bring it into view
    if (window.innerWidth < 1024) {
      setTimeout(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      {/* Soft blue glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 -top-48 h-[620px] w-[620px] rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="absolute -bottom-56 -left-48 h-[520px] w-[520px] rounded-full bg-brand-500/15 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1520px] flex-1 flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
        <header className="border-b border-line py-4 lg:py-5">
          <span className="text-2xl font-extrabold tracking-tight">
            IYT<span className="text-brand-400">.</span>
          </span>
        </header>

        <div className="grid flex-1 content-center gap-10 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14 lg:py-10 xl:gap-20">
          {/* Left: stays the same on both steps */}
          <div>
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
              {highlights.map(({ logo, alt, title, text }) => (
                <li
                  key={title}
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-panel p-3"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                    <img src={logo} alt={alt} className="h-7 w-7 object-contain" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight sm:text-base">{title}</p>
                    <p className="text-xs text-slate-400 sm:text-sm">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form, then FAQ after submit */}
          <div ref={cardRef} className="relative scroll-mt-4">
            <div className="absolute -left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink lg:flex">
              <span className="h-4 w-1 rounded-full bg-white" />
            </div>

            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.div key="form" {...swap}>
                  <EnquiryForm
                    initialValues={lead}
                    onSuccess={(data) => { setLead(data); goTo('faq') }}
                  />
                </motion.div>
              ) : (
                <motion.div key="faq" {...swap}>
                  <FaqPanel name={lead?.name} onBack={() => goTo('form')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}