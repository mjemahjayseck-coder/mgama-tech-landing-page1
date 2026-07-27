import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Cctv,
  DoorOpen,
  Zap,
  BellRing,
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Wallet,
  MapPin,
  Mail,
  Clock,
  Send,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const PHONE = '+255 742 272 749';
const PHONE_TEL = '+255742272749';
const WHATSAPP = '255742272749';
const EMAIL = 'Mgamatechtz@gmail.com';
const MAPS_LINK = 'https://maps.app.goo.gl/3icHQSsVrfGisQTx8?g_st=ac';
const WA_LINK = `https://wa.me/${WHATSAPP}`;

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Brands', href: '#brands' },
  { label: 'Showroom', href: '#showroom' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    icon: Cctv,
    title: 'Hikvision CCTV Systems',
    desc: 'IP, ColorVu & NVR configuration with remote viewing, night vision and high-definition recording.',
    image: '/cctv.jpeg',
  },
  {
    icon: DoorOpen,
    title: 'Automatic Gate Motors',
    desc: 'Gemini & Centurion sliding and swing gate motor sales, installation and professional repair.',
    image: '/gate-motor.jpeg',
  },
  {
    icon: Zap,
    title: 'Electric Fencing & Razor Wire',
    desc: 'Perimeter energizers, high-security wiring and razor wire to protect homes and commercial sites.',
    image: '/electric-fence.jpeg',
  },
  {
    icon: BellRing,
    title: 'Alarm Systems & Access Control',
    desc: 'Intercoms, video doorbells and intruder alarm systems with smart access management.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
  },
];

const BRANDS = ['Hikvision', 'Gemini Automation', 'Centurion Systems', 'Nemtek'];

const WHY_US = [
  { icon: BadgeCheck, title: 'Certified Technicians', desc: 'Trained and certified installers for every product we supply.' },
  { icon: ShieldCheck, title: 'Official Hardware Dealer', desc: 'Genuine Hikvision, Gemini, Centurion and Nemtek products only.' },
  { icon: Wrench, title: 'Fast Local Maintenance & Repair', desc: 'Rapid response maintenance and repair across Dar es Salaam.' },
  { icon: Wallet, title: 'Transparent Pricing', desc: 'Clear, upfront quotes with no hidden charges — ever.' },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header({ onNavClick }: { onNavClick: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'frosted shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 sm:h-20">
          {/* Left: desktop nav (hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-8 justify-self-start">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-[#E50914] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button (left on small screens) */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 justify-self-start"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Center: enlarged logo */}
          <a href="#home" className="flex items-center gap-3 group justify-self-center">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#E50914] shadow-lg shadow-red-900/30">
              <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Mgama<span className="text-[#E50914]"> Tech</span>
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 tracking-wide mt-0.5">
                Innovation · Quality · Security
              </span>
            </div>
          </a>

          {/* Right: call button */}
          <div className="flex items-center gap-3 justify-self-end">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#E50914] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 hover:bg-red-600 transition-all hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden frosted border-t border-white/10">
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { setOpen(false); onNavClick(); }}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#E50914] px-4 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#121417]">
      <div className="absolute inset-0 tech-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#121417] via-[#1A1D20] to-[#121417]" />
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[#E50914]/10 blur-[120px]" />
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#F5A623]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#E50914]/40 bg-[#E50914]/10 px-3 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full gold-dot" />
            <span className="text-xs font-semibold text-red-200 tracking-wide uppercase">
              Goba Njia Nne · Dar es Salaam
            </span>
          </div>

          <h1 className="reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white tracking-tight">
            Advanced CCTV, Gate Automation & <span className="text-[#E50914]">Electric Fencing</span> in Dar es Salaam
          </h1>

          <p className="reveal mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Authorized supplier and certified installers of Hikvision cameras, Gemini & Centurion gate motors, and perimeter security systems.
          </p>

          <div className="reveal mt-10 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E50914] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-red-900/40 hover:bg-red-600 transition-all hover:scale-105"
            >
              Request Free Quote
              <ChevronRight className="h-5 w-5" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-400">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#E50914]" /> Certified Installers</span>
            <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#E50914]" /> Genuine Products</span>
            <span className="flex items-center gap-2"><Wrench className="h-4 w-4 text-[#E50914]" /> Local Support</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1">
          <div className="h-2 w-1 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[#F8F9FA] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="reveal text-sm font-bold uppercase tracking-widest text-[#E50914]">What We Do</p>
          <h2 className="reveal mt-3 text-3xl sm:text-4xl font-extrabold text-[#121417] tracking-tight">
            Core Security Services
          </h2>
          <p className="reveal mt-4 text-lg text-gray-600">
            End-to-end security solutions — from supply and installation to maintenance and repair.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="reveal lift-card group rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/80 via-[#121417]/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E50914] shadow-lg">
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#121417]">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section id="brands" className="bg-[#121417] py-16 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="reveal text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
          Brands We Trust
        </p>
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {BRANDS.map((b) => (
            <div
              key={b}
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-8 hover:border-[#E50914]/40 hover:bg-white/10 transition-all"
            >
              <span className="text-lg sm:text-xl font-bold text-white/90 tracking-tight text-center">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showroom() {
  return (
    <section id="showroom" className="bg-[#1A1D20] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="reveal relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/storefront.jpeg"
              alt="Mgama Tech Hikvision Shop - Goba Njia Nne"
              loading="lazy"
              className="w-full h-72 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-[#E50914] px-3 py-1.5 shadow-lg">
                <ShieldCheck className="h-4 w-4 text-white" />
                <span className="text-sm font-bold text-white">Hikvision Authorized Shop</span>
              </div>
              <p className="mt-2 text-white font-semibold text-sm">Mgama Tech · Goba Njia Nne</p>
            </div>
          </div>

          <div>
            <p className="reveal text-sm font-bold uppercase tracking-widest text-[#E50914]">Visit Us</p>
            <h2 className="reveal mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Visit Our Showroom
            </h2>
            <p className="reveal mt-4 text-lg text-gray-400 leading-relaxed">
              Come see our range of security products in person at our Goba Njia Nne store. Talk to our experts and get the right system for your property.
            </p>

            <div className="reveal mt-8 space-y-4">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#E50914]/40 transition-colors">
                  <Mail className="h-5 w-5 text-[#E50914]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p className="text-white font-medium group-hover:text-[#E50914] transition-colors">{EMAIL}</p>
                </div>
              </a>

              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-[#E50914]/40 transition-colors">
                  <Phone className="h-5 w-5 text-[#E50914]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                  <p className="text-white font-medium group-hover:text-[#E50914] transition-colors">{PHONE}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Clock className="h-5 w-5 text-[#E50914]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Opening Hours</p>
                  <p className="text-white font-medium">Mon–Fri: 8:00 AM – 6:00 PM</p>
                  <p className="text-gray-400 text-sm">Sat: 8:30 AM – 4:00 PM · Sun: Closed</p>
                </div>
              </div>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal mt-8 inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 hover:bg-red-600 transition-all hover:scale-105"
            >
              <MapPin className="h-5 w-5" />
              Get Directions on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="bg-[#F8F9FA] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="reveal text-sm font-bold uppercase tracking-widest text-[#E50914]">The Mgama Advantage</p>
          <h2 className="reveal mt-3 text-3xl sm:text-4xl font-extrabold text-[#121417] tracking-tight">
            Why Choose Mgama Tech
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="reveal lift-card rounded-2xl bg-white p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E50914]/10 mb-4">
                  <Icon className="h-7 w-7 text-[#E50914]" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-[#121417]">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !phone || !service) {
      setErrorMessage('Please fill in your Name, Phone Number, and select a Service.');
      setStatus('error');
      return;
    }

    try {
      await supabase.from('quote_requests').insert({
        name,
        phone,
        service,
        message: message || null,
      });
    } catch (err) {
      console.log('Supabase bypassed:', err);
    }

    setStatus('success');
    formRef.current?.reset();

    const lines = [
      `*New Quote Request — Mgama Tech*`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Service Required:* ${service}`,
    ];

    if (message) {
      lines.push(`*Message:* ${message}`);
    }
    lines.push(``, `_Sent from mgamatech.netlify.app_`);

    const text = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${text}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="bg-[#121417] py-20 sm:py-28 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="reveal text-sm font-bold uppercase tracking-widest text-[#E50914]">Get In Touch</p>
          <h2 className="reveal mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">Request A Free Quote</h2>
          <p className="reveal mt-4 text-gray-400">
            Fill out the details below and we will contact you immediately on WhatsApp or Phone.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Name <span className="text-[#E50914]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Phone Number <span className="text-[#E50914]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 0742 272 749"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Service Required <span className="text-[#E50914]">*</span>
              </label>
              <select
                name="service"
                required
                defaultValue=""
                className="w-full rounded-xl border border-white/10 bg-[#1A1D20] px-4 py-3 text-white focus:border-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]"
              >
                <option value="" disabled>Select a service...</option>
                {SERVICES.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Message / Details <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Write any extra details here if you like (optional)..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]"
              />
            </div>

            {status === 'error' && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
                {errorMessage || 'Please fill in all required fields and try again.'}
              </div>
            )}

            {status === 'success' && (
              <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-3 text-sm text-green-300">
                Thank you! Redirecting to WhatsApp...
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#E50914] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-red-900/40 hover:bg-red-600 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
              {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  return (
    <div className="min-h-screen bg-[#121417] text-white selection:bg-[#E50914] selection:text-white">
      <Header onNavClick={() => {}} />
      <Hero />
      <Services />
      <Brands />
      <Showroom />
      <WhyUs />
      <Contact />
    </div>
  );
}
