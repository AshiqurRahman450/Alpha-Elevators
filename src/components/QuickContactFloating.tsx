import { Phone } from 'lucide-react'

export const QuickContactFloating = () => {
  return (
    <aside 
      aria-label="Quick Contact Channels"
      className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 pointer-events-auto select-none print:hidden"
    >
      {/* ─── 1. Direct Phone Call Button ─── */}
      <div className="relative group flex items-center gap-2">
        {/* Hover Tooltip */}
        <span 
          role="tooltip"
          className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-[#0c0c0c]/95 text-white text-xs font-mono py-1.5 px-3 rounded shadow-2xl border border-white/15 backdrop-blur-md whitespace-nowrap hidden sm:block"
        >
          Call Engineering: <strong className="text-[#00cccc] font-semibold">+91 91763 67030</strong>
        </span>

        <a
          href="tel:+919176367030"
          aria-label="Call Alpha Elevators Engineering Desk"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0891b2] hover:bg-[#00cccc] text-white hover:text-black flex items-center justify-center shadow-[0_8px_25px_rgba(8,145,178,0.5)] hover:shadow-[0_12px_30px_rgba(0,204,204,0.7)] active:scale-95 hover:scale-105 transition-all duration-300 border border-white/20"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-[#00cccc] animate-ping opacity-40 pointer-events-none" />
          <Phone className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
        </a>
      </div>

      {/* ─── 2. WhatsApp Direct Chat Button ─── */}
      <div className="relative group flex items-center gap-2">
        {/* Hover Tooltip */}
        <span 
          role="tooltip"
          className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-[#0c0c0c]/95 text-white text-xs font-mono py-1.5 px-3 rounded shadow-2xl border border-white/15 backdrop-blur-md whitespace-nowrap hidden sm:block"
        >
          Direct WhatsApp: <strong className="text-[#25D366] font-semibold">Chat with an Architect</strong>
        </span>

        <a
          href="https://wa.me/919176367030?text=Hello%20Alpha%20Elevators%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20home%20elevator."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Alpha Elevators on WhatsApp"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.75)] active:scale-95 hover:scale-105 transition-all duration-300 border border-white/20"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-45 pointer-events-none" />
          
          {/* WhatsApp SVG Icon */}
          <svg 
            className="w-7 h-7 fill-white transform group-hover:scale-110 transition-transform duration-300"
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </aside>
  )
}
