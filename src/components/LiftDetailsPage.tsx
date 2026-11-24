import { useState, useRef, useEffect } from 'react'
import { 
  Star, Check, ShieldCheck, ChevronRight, ChevronLeft, 
  Download, Phone, MessageCircle, Layers, 
  Award, ArrowRight, CheckCircle2,
  Wrench, Truck, Play, X, ArrowLeft, Cog, RotateCcw
} from 'lucide-react'

export type LiftData = {
  name: string
  id: string
  budget: string
  color: string
  description: string
  features: string[]
}

interface ProductColor {
  id: string
  name: string
  hex: string
  tag: string
  image: string
  gallery?: {
    url: string
    caption: string
  }[]
  customVideos?: {
    overall?: string
    pit?: string
    mechanism?: string
  }
}

interface ProductSpec {
  label: string
  value: string
  highlight?: boolean
}

interface ProductItem {
  id: string
  num: string
  name: string
  series: string
  tagline: string
  badge: string
  rating: number
  reviewsCount: number
  startingPrice: string
  pricingBadge?: string
  paymentTerms: string
  description: string
  features: string[]
  specs: ProductSpec[]
  colors: ProductColor[]
  gallery: { url: string; caption: string }[]
  videoPlaceholderUrl?: string
  customVideos?: {
    overall?: string
    pit?: string
    mechanism?: string
  }
}

/* ─── Product Models (Updated directly from the 4 attached technical sheets) ─── */
const PRODUCTS: ProductItem[] = [
  /* ── 01. HYDRAULIC HOME LIFT (Image 1) ── */
  {
    id: 'AE01',
    num: '01',
    name: 'HYDRAULIC HOME LIFT',
    series: 'Standard Series',
    tagline: 'Imported Hydraulic Technology with 194 Safety Parameters',
    badge: '#1 Bestseller in Home Lifts',
    rating: 4.9,
    reviewsCount: 168,
    startingPrice: '₹8,50,000',
    pricingBadge: 'Direct Factory Import',
    paymentTerms: 'Stage-wise Milestone Payments',
    description:
      'ALPHA Hydraulic offers advanced hydraulic technology with 194 safety parameters for unmatched reliability. Fully imported from Italy, it meets the highest safety and quality standards. Experience superior engineering designed to keep you safe and elevate your lifestyle.',
    features: [
      '194 safety parameters with multi-stage pressure & leak protection',
      'Fully imported Northern Italian hydraulic drive mechanism',
      'Zero pit requirement (only 150mm minimum recess needed)',
      'No separate machine room required (self-contained MRL system)',
      'Eco-efficient single phase 230V household power supply',
      'Smooth jerk-free travel with 80% vibration reduction',
      'Oil change required only once every 10 years (German oil-seal technology)',
      'Supports masonry, self-supporting metal structure, or 360° panoramic glass'
    ],
    specs: [
      { label: 'Maximum Floors', value: 'G+3', highlight: true },
      { label: 'Machine Room', value: 'Not Required', highlight: true },
      { label: 'Technical Compliance', value: 'Machinery Directive 2006/42/EC EN81-41' },
      { label: 'Drive System', value: 'Hydraulic', highlight: true },
      { label: 'Power Supply', value: 'Single Phase', highlight: true },
      { label: 'Maximum Stops', value: '4' },
      { label: 'Maximum Entrances', value: '8' },
      { label: 'Minimum Pit Depth', value: '150mm', highlight: true },
      { label: 'Shaft Structure', value: 'Masonary/Metal/Glass' },
      { label: 'Rated Load', value: '440kg', highlight: true },
      { label: 'Minimum Headroom', value: '2800mm' },
      { label: 'Maximum Speed', value: 'upto 0.5m/s' }
    ],
    colors: [
      {
        id: 'normal',
        name: 'Normal',
        hex: '#d4af37',
        tag: 'Champagne Gold Finish',
        image: '/lifts/ae01-normal-full.jpg',
        gallery: [
          {
            url: '/lifts/ae01-normal-full.jpg',
            caption: 'Normal Champagne Gold — Full Height Architectural Elevation'
          },
          {
            url: '/lifts/ae01-normal-cabin.jpg',
            caption: 'Normal Champagne Gold — Luxury Cabin & Landing Door'
          },
          {
            url: '/lifts/ae01-normal-open.jpg',
            caption: 'Normal Champagne Gold — Illuminated Interior (Door Open)'
          },
          {
            url: '/lifts/ae01-normal-top.jpg',
            caption: 'Normal Champagne Gold — Top-Down Panoramic Structural View'
          },
          {
            url: '/lifts/ae01-normal-poster.jpg',
            caption: 'Model AE01 Italian Engineering — Technical Specifications & Safety Parameters'
          }
        ],
        customVideos: {
          overall: '/lifts/hydraulic-overall.mp4',
          pit: '/lifts/hydraulic-pit.mp4',
          mechanism: '/lifts/hydraulic-mechanism.mp4'
        }
      },
      {
        id: 'black',
        name: 'Black',
        hex: '#1e1e1e',
        tag: 'Soft Obsidian Black',
        image: '/lifts/ae01-black-full.jpg',
        gallery: [
          {
            url: '/lifts/ae01-black-full.jpg',
            caption: 'Soft Obsidian Black — Full Height Architectural Elevation'
          },
          {
            url: '/lifts/ae01-black-cabin.jpg',
            caption: 'Soft Obsidian Black — Luxury Cabin & Landing Door'
          },
          {
            url: '/lifts/ae01-black-open.jpg',
            caption: 'Soft Obsidian Black — Illuminated Interior (Door Open)'
          },
          {
            url: '/lifts/ae01-black-top.jpg',
            caption: 'Soft Obsidian Black — Top-Down Panoramic Structural View'
          },
          {
            url: '/lifts/ae01-black-poster.jpg',
            caption: 'Model AE01 Black Edition — Technical Specifications & Safety Parameters'
          }
        ],
        customVideos: {
          overall: '/lifts/black-overall.mp4',
          pit: '/lifts/black-pit.mp4',
          mechanism: '/lifts/black-mechanism.mp4'
        }
      }
    ],
    gallery: [
      {
        url: '/lifts/ae01-normal-full.jpg',
        caption: 'Normal Champagne Gold — Full Height Architectural Elevation'
      },
      {
        url: '/lifts/ae01-normal-cabin.jpg',
        caption: 'Normal Champagne Gold — Luxury Cabin & Landing Door'
      },
      {
        url: '/lifts/ae01-normal-open.jpg',
        caption: 'Normal Champagne Gold — Illuminated Interior (Door Open)'
      },
      {
        url: '/lifts/ae01-normal-top.jpg',
        caption: 'Normal Champagne Gold — Top-Down Panoramic Structural View'
      },
      {
        url: '/lifts/ae01-normal-poster.jpg',
        caption: 'Model AE01 Champagne Gold — Technical Specifications & Safety Parameters'
      },
      {
        url: '/lifts/ae01-black-full.jpg',
        caption: 'Soft Obsidian Black — Full Height Architectural Elevation'
      },
      {
        url: '/lifts/ae01-black-cabin.jpg',
        caption: 'Soft Obsidian Black — Luxury Cabin & Landing Door'
      },
      {
        url: '/lifts/ae01-black-open.jpg',
        caption: 'Soft Obsidian Black — Illuminated Interior (Door Open)'
      },
      {
        url: '/lifts/ae01-black-top.jpg',
        caption: 'Soft Obsidian Black — Top-Down Panoramic Structural View'
      },
      {
        url: '/lifts/ae01-black-poster.jpg',
        caption: 'Model AE01 Obsidian Black — Technical Specifications & Safety Parameters'
      }
    ],
    customVideos: {
      overall: '/lifts/hydraulic-overall.mp4',
      pit: '/lifts/hydraulic-pit.mp4',
      mechanism: '/lifts/hydraulic-mechanism.mp4'
    },
    videoPlaceholderUrl: '/lifts/hydraulic-overall.mp4'
  },

  /* ── 02. GEARLESS ROPE DRIVE (Image 2) ── */
  {
    id: 'AE02',
    num: '02',
    name: 'GEARLESS ROPE DRIVE - HOME LIFT',
    series: 'Premium Traction',
    tagline: 'Complies with European Lifts Directive 2014/33/EU',
    badge: 'Popular for G+4 & G+5 Residences',
    rating: 4.9,
    reviewsCount: 142,
    startingPrice: '₹12,00,000',
    pricingBadge: 'Direct Manufacturer Pricing',
    paymentTerms: 'Stage-wise Milestone Payments',
    description:
      'ALPHA Gearless unique traction lift solution that complies with lifts Directive 2014/33/EU. Installation can be customised to any architectural need and design, even special and challenging projects. It is elegant and above all, truly convenient solution, allowing for perfect new building.',
    features: [
      'Complies with European Lifts Directive 2014/33/EU & Machinery Directive 2014/33/EC EN81-41',
      'Advanced gearless traction with high speed travel up to 1.0 m/s',
      'Accommodates high travel: up to G+5 floors and 12 entrances',
      'Precision staged safety gears with overspeed governor and instantaneous stop',
      'Microprocessor VVVF PWM inverter controller for up to 45% power savings',
      'Multi-access biometric authentication, touch COP & RFID security ready',
      'Machine room not required; completely self-contained within structural footprint',
      'Ultra-quiet counterbalanced ride with low kinetic friction'
    ],
    specs: [
      { label: 'Maximum Floors', value: 'G+5', highlight: true },
      { label: 'Machine Room', value: 'Not Required', highlight: true },
      { label: 'Technical Compliance', value: 'Machinery Directive 2014/33/EC EN81-41' },
      { label: 'Drive System', value: 'Gearless with Rope Drive', highlight: true },
      { label: 'Power Supply', value: 'Single Phase', highlight: true },
      { label: 'Maximum Stops', value: '6' },
      { label: 'Maximum Entrances', value: '12', highlight: true },
      { label: 'Minimum Pit Depth', value: '250mm', highlight: true },
      { label: 'Shaft Structure', value: 'Masonary/Metal/Glass' },
      { label: 'Rated Load', value: '440kg', highlight: true },
      { label: 'Minimum Headroom', value: '3000mm' },
      { label: 'Maximum Speed', value: 'upto 1m/s', highlight: true }
    ],
    colors: [
      {
        id: 'white',
        name: 'Pristine Main White',
        hex: '#f5f5f5',
        tag: 'Architectural Minimalist Finish',
        image: 'https://alphaelevators.in/gallery/modern-rope-elevator-chennai.webp'
      },
      {
        id: 'silver',
        name: 'Brushed Titanium Steel',
        hex: '#7e8790',
        tag: 'Industrial Precision Satin',
        image: 'https://alphaelevators.in/gallery/rope-lift-installation-chennai.webp'
      },
      {
        id: 'gold',
        name: 'Champagne Signature Gold',
        hex: '#cca73d',
        tag: 'PVD Titanium Mirror Gold',
        image: '/lifts/lift1.jpg'
      },
      {
        id: 'black',
        name: 'Obsidian Velvet Black',
        hex: '#161616',
        tag: 'Deep Matte Texture',
        image: '/locations/coimbatore-home-elevator.webp'
      }
    ],
    gallery: [
      {
        url: 'https://alphaelevators.in/gallery/modern-rope-elevator-chennai.webp',
        caption: 'Gearless Rope Drive System in Duplex Living Core'
      },
      {
        url: 'https://alphaelevators.in/gallery/rope-lift-installation-chennai.webp',
        caption: 'Permanent Magnet Synchronous Motor & Overhead Rail Assembly'
      },
      {
        url: '/lifts/lift1.jpg',
        caption: 'Premium Cabin Interior with Vein-Matched Italian Marble Floor'
      },
      {
        url: '/locations/coimbatore-home-elevator.webp',
        caption: 'Self-Supporting Modern Glass Structure'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        caption: 'Center Opening Automatic Sliding Glass Doors'
      }
    ],
    videoPlaceholderUrl: '/lifts/Final.mp4'
  },

  /* ── 03. GEARLESS BELT DRIVE (Image 3) ── */
  {
    id: 'AE03',
    num: '03',
    name: 'GEARLESS BELT DRIVE - HOME LIFT',
    series: 'Luxury Patented Belt',
    tagline: 'Patented Frictionless Belt Technology with Zero Oiling',
    badge: 'Luxury Flagship Choice',
    rating: 5.0,
    reviewsCount: 198,
    startingPrice: '₹18,00,000',
    pricingBadge: 'Direct Manufacturer Pricing',
    paymentTerms: 'Stage-wise Milestone Payments',
    description:
      'State of the art technology finally at a very less cost. ALPHA Gear-less belt -model works on a patented belt driven technology with counter weights. This in turn helps with better speed with no friction, completely ruling out the possibility for greasing and oiling.',
    features: [
      'Patented steel-cord embedded polyurethane belt drive with counterweights',
      '100% friction-free operation ruling out any greasing, oiling, or messy maintenance',
      'Ultra-compact low headroom requirement of just 2400mm (lowest in luxury class)',
      'Smooth start and stop profile delivering whisper-quiet travel under 45 dB',
      'Supercar-inspired predictive sensor array monitoring system integrity',
      'Rivet-less shaft design with seamless 360-degree panoramic glass views',
      'Compatible with up to G+5 floors, 6 stops, and 12 entrances',
      'Compliant with MD 2006/42/EC and EN81-41 international elevator safety'
    ],
    specs: [
      { label: 'Maximum Floors', value: 'G+5', highlight: true },
      { label: 'Machine Room', value: 'Not Required', highlight: true },
      { label: 'Technical Compliance', value: 'Machinery Directive 2006/42/EC EN81-41' },
      { label: 'Drive System', value: 'Gearless Belt Driven', highlight: true },
      { label: 'Power Supply', value: 'Single Phase', highlight: true },
      { label: 'Maximum Stops', value: '6' },
      { label: 'Maximum Entrances', value: '12' },
      { label: 'Minimum Pit Depth', value: '250mm', highlight: true },
      { label: 'Shaft Structure', value: 'Masonary/Metal/Glass' },
      { label: 'Rated Load', value: '440kg', highlight: true },
      { label: 'Minimum Headroom', value: '2400mm', highlight: true },
      { label: 'Maximum Speed', value: 'upto 1m/s', highlight: true }
    ],
    colors: [
      {
        id: 'soft-black',
        name: 'Soft Obsidian Black',
        hex: '#141416',
        tag: 'Grand Duplex Centerpiece Architecture',
        image: '/lifts/ae03-grand-duplex.jpg'
      },
      {
        id: 'gold',
        name: 'PVD Titanium Mirror Gold',
        hex: '#d4af37',
        tag: 'Signature Villa Edition',
        image: 'https://alphaelevators.in/gallery/gallery.jpg'
      },
      {
        id: 'white',
        name: 'Nordic Clean White',
        hex: '#f7f8fa',
        tag: 'Luminous Minimalist Accent',
        image: '/locations/coimbatore-glass-elevator.webp'
      },
      {
        id: 'platinum',
        name: 'Modern Living Core',
        hex: '#2b2b2e',
        tag: 'Minimalist Open-Living Architectural Integration',
        image: '/lifts/ae03-luxury-living.jpg'
      }
    ],
    gallery: [
      {
        url: '/lifts/ae03-grand-duplex.jpg',
        caption: 'AE03 Grand Duplex Centerpiece with Ambient Cove Lighting'
      },
      {
        url: '/lifts/ae03-luxury-living.jpg',
        caption: 'AE03 Minimalist Open-Living Room Integration with Glass Doors'
      },
      {
        url: '/lifts/lift4.jpg',
        caption: 'Soft Obsidian Black Luxury Cabin with Acoustic Dampened Walling'
      },
      {
        url: 'https://alphaelevators.in/gallery/gallery.jpg',
        caption: 'PVD Titanium Gold Finishes & Diffuse Coffer Ceilings'
      },
      {
        url: '/locations/coimbatore-glass-elevator.webp',
        caption: '360° Panoramic Curved Glass Shaft Installation'
      },
      {
        url: 'https://alphaelevators.in/nimg/ae02.jpeg',
        caption: 'Patented Belt Drive Core Unit & Counterweight Track'
      }
    ],
    videoPlaceholderUrl: '/lifts/0001.mp4'
  },

  /* ── 04. GEARLESS BELT DRIVE (EV) (Image 4) ── */
  {
    id: 'EV01',
    num: '04',
    name: 'GEARLESS BELT DRIVE (EV) - HOME LIFT',
    series: 'Eco-Smart EV Series',
    tagline: 'Single-Phase Green Mobility with Lithium Battery Backup',
    badge: 'Eco-Smart Innovation of the Year',
    rating: 5.0,
    reviewsCount: 114,
    startingPrice: '₹22,00,000',
    pricingBadge: 'Direct Manufacturer Pricing',
    paymentTerms: 'Stage-wise Milestone Payments',
    description:
      'Experience smooth, silent and energy-efficient travel with our advanced gearless belt-driven technology. Designed exclusively for modern homes, the EV Home Lift offers reliable performance, low maintenance and comfortable movement without the need for a machine room.',
    features: [
      'Advanced onboard lithium battery pack with up to 10 days / 100 trips backup during blackouts*',
      'Intelligent regenerative descent technology recharging onboard auxiliary cells on downward runs',
      'Ultra-low energy consumption: uses less than 15 units of electricity per month',
      'Runs effortlessly on standard single-phase 240V 0.75kW residential household connection',
      'Zero civil machine room required; fits seamlessly in existing stairwell voids or outdoor shafts',
      '100% lubricant-free patented polyurethane belts for clean, odorless home environment',
      'Intelligent solar inverter and home UPS seamless handshake integration',
      'Equipped with 360-degree glass view, touch COP, and automatic landing interlocks'
    ],
    specs: [
      { label: 'Battery', value: 'Lithium Battery', highlight: true },
      { label: 'EV Battery Backup', value: 'Up to 10 Days / 100 Trips*', highlight: true },
      { label: 'Maximum Floors', value: 'G+4', highlight: true },
      { label: 'Machine Room', value: 'Not Required', highlight: true },
      { label: 'Technical Compliance', value: 'Machinery Directive 2006/42/EC EN81-41' },
      { label: 'Drive System', value: 'Gearless Belt Driven', highlight: true },
      { label: 'Power Supply', value: 'Single Phase', highlight: true },
      { label: 'Maximum Stops', value: '5' },
      { label: 'Maximum Entrances', value: '10' },
      { label: 'Minimum Pit Depth', value: '250mm', highlight: true },
      { label: 'Shaft Structure', value: 'Masonary/Metal/Glass' },
      { label: 'Rated Load', value: '440kg', highlight: true },
      { label: 'Minimum Headroom', value: '3000mm' },
      { label: 'Maximum Speed', value: 'upto 1m/s', highlight: true }
    ],
    colors: [
      {
        id: 'cyan',
        name: 'Cyber Cyan Eco Edition',
        hex: '#00cccc',
        tag: 'Alpha Green Signature',
        image: '/lifts/ev01-model-vision.jpg'
      },
      {
        id: 'black',
        name: 'Stealth Midnight Black',
        hex: '#141416',
        tag: 'Matte Obsidian Trim',
        image: '/locations/chennai-luxury-elevator.webp'
      },
      {
        id: 'silver',
        name: 'Aero Titanium Silver',
        hex: '#8d939c',
        tag: 'Satin Aerospace Finish',
        image: 'https://alphaelevators.in/gallery/modern-rope-elevator-chennai.webp'
      },
      {
        id: 'white',
        name: 'Glacier Pure White',
        hex: '#f5f7f9',
        tag: 'Reflective Glass Accent',
        image: '/locations/chennai-modern-lift.webp'
      }
    ],
    gallery: [
      {
        url: '/lifts/ev01-model-vision.jpg',
        caption: 'EV Smart Cabin with Ambient Cyber LED Atmosphere'
      },
      {
        url: 'https://alphaelevators.in/gallery/modern-rope-elevator-chennai.webp',
        caption: 'Regenerative Braking Motor & Smart Microprocessor Core'
      },
      {
        url: '/locations/coimbatore-glass-elevator.webp',
        caption: 'Glass Enclosure Powered by Residential Rooftop Solar'
      },
      {
        url: '/locations/chennai-modern-lift.webp',
        caption: 'Zero Pit Setup for Existing Living Spaces'
      },
      {
        url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200&auto=format&fit=crop',
        caption: 'Ultra-Quiet Belt Motion with Micro-Pulse Control'
      }
    ],
    videoPlaceholderUrl: '/lifts/tripo-showcase-ddea2d59-ccba-4b7e-a533-08f6b851c8c8.mp4'
  }
]

export const LiftDetailsPage = ({ 
  lift, 
  onBack, 
  onRequestConsultation 
}: { 
  lift?: LiftData
  onBack: () => void
  onRequestConsultation?: (data?: { modelName: string, id: string, budget: string }) => void 
}) => {
  // Find initial product index based on passed prop (or default to 0)
  const initialIndex = lift
    ? PRODUCTS.findIndex((p) => p.id === lift.id || p.name.toLowerCase().includes(lift.name.toLowerCase()))
    : 0
  const [activeProductIdx, setActiveProductIdx] = useState(initialIndex >= 0 ? initialIndex : 0)

  const currentProduct = PRODUCTS[activeProductIdx]

  // Color selection state
  const [selectedColor, setSelectedColor] = useState<ProductColor>(currentProduct.colors[0])
  
  // Active preview image
  const [activeImage, setActiveImage] = useState<string>(currentProduct.colors[0].image)
  const [activeCaption, setActiveCaption] = useState<string>(currentProduct.colors[0].tag)

  // Active custom video mode: 'overall' | 'pit' | 'mechanism' | null (initially overall on hydraulic)
  const [activeVideoMode, setActiveVideoMode] = useState<'overall' | 'pit' | 'mechanism' | null>(
    currentProduct.customVideos?.overall ? 'overall' : null
  )

  // Zoom magnifier state
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Draggable thumbnail rail ref & drag handling
  const thumbnailRailRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Quick Consultation Quote Modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedFloors, setSelectedFloors] = useState('G+1 (2 Stops)')
  const [selectedDoorOpening, setSelectedDoorOpening] = useState('Standard Inline')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientCity, setClientCity] = useState('Chennai')
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)

  // Video preview modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // Sync color & active image when product changes (initially plays normal overall video on loop)
  useEffect(() => {
    setSelectedColor(currentProduct.colors[0])
    setActiveImage(currentProduct.colors[0].image)
    setActiveCaption(currentProduct.colors[0].tag)
    if (currentProduct.customVideos?.overall) {
      setActiveVideoMode('overall')
    } else {
      setActiveVideoMode(null)
    }
  }, [activeProductIdx])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  // Mouse move zoom calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100))
    setZoomPos({ x, y })
  }

  // Draggable thumbnails mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!thumbnailRailRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - thumbnailRailRef.current.offsetLeft)
    setScrollLeft(thumbnailRailRef.current.scrollLeft)
  }

  const handleMouseLeaveThumb = () => setIsDragging(false)
  const handleMouseUpThumb = () => setIsDragging(false)

  const handleMouseMoveThumb = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !thumbnailRailRef.current) return
    e.preventDefault()
    const x = e.pageX - thumbnailRailRef.current.offsetLeft
    const walk = (x - startX) * 1.6
    thumbnailRailRef.current.scrollLeft = scrollLeft - walk
  }

  // Thumbnail rail arrow buttons
  const scrollThumbnails = (dir: 'left' | 'right') => {
    if (!thumbnailRailRef.current) return
    const offset = dir === 'left' ? -220 : 220
    thumbnailRailRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  // Active custom videos (per-color custom videos take priority if defined, otherwise product default)
  const activeVideos = selectedColor?.customVideos || currentProduct.customVideos

  // Color change handler:
  // - Plays overall video on loop for the selected finish (Normal Overall or Black Overall)
  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color)
    setActiveImage(color.image)
    setActiveCaption(`${color.name} — ${color.tag}`)
    const targetVideos = color.customVideos || currentProduct.customVideos
    if (targetVideos?.overall) {
      setActiveVideoMode('overall')
    } else {
      setActiveVideoMode(null)
    }
  }

  // Switch to normal / standard edition video
  const handleSwitchToNormalVideo = () => {
    const normalColor = currentProduct.colors.find((c) => !c.id.includes('black')) || currentProduct.colors[0]
    setSelectedColor(normalColor)
    setActiveImage(normalColor.image)
    setActiveCaption(`${normalColor.name} — ${normalColor.tag}`)
    setActiveVideoMode('overall')
  }

  // Switch to black edition video
  const handleSwitchToBlackVideo = () => {
    const blackColor = currentProduct.colors.find((c) => c.id.includes('black'))
    if (blackColor) {
      handleColorSelect(blackColor)
    }
  }

  type MediaItem = {
    url: string
    caption: string
    isColor: boolean
    colorId?: string
    isVideo?: boolean
    videoMode?: 'overall' | 'pit' | 'mechanism'
  }

  // Combined media items (active finish perspective photos + custom video demonstrations)
  const activePhotos = selectedColor?.gallery || currentProduct.gallery

  const allMediaItems: MediaItem[] = [
    // 1. Perspective architectural photos for the selected finish
    ...activePhotos.map((g) => ({
      url: g.url,
      caption: g.caption,
      isColor: false
    })),
    // 2. Video demonstrations
    ...(activeVideos?.overall ? [{
      url: selectedColor?.image || currentProduct.colors[0]?.image || '/lifts/ae01-normal-full.jpg',
      caption: `${selectedColor?.name || currentProduct.name} — Overall 360° Video (Loop)`,
      isColor: false,
      isVideo: true,
      videoMode: 'overall' as const
    }] : []),
    ...(activeVideos?.pit ? [{
      url: selectedColor?.image || currentProduct.colors[0]?.image || '/lifts/ae01-normal-full.jpg',
      caption: `${selectedColor?.name || currentProduct.name} — Pit 150mm Demonstration (Single Play)`,
      isColor: false,
      isVideo: true,
      videoMode: 'pit' as const
    }] : []),
    ...(activeVideos?.mechanism ? [{
      url: selectedColor?.image || currentProduct.colors[0]?.image || '/lifts/ae01-normal-full.jpg',
      caption: `${selectedColor?.name || currentProduct.name} — Drive Mechanism Demonstration`,
      isColor: false,
      isVideo: true,
      videoMode: 'mechanism' as const
    }] : [])
  ]

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hi Alpha Elevators, I am interested in the ${currentProduct.name} (${currentProduct.series}) with ${selectedColor.name} finish. Please provide a preliminary quotation and site feasibility details.`
    )
    window.open(`https://wa.me/918015129224?text=${text}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07090d] text-[#e8eaed] w-full font-sans antialiased selection:bg-accent/30 selection:text-white pb-24">
      {/* ─── Top Amazon-Style Navigation Bar ─── */}
      <header className="sticky top-0 z-40 w-full bg-[#0b0e14]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 bg-white/5 hover:bg-accent/15 hover:border-accent text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
              title="Back to Gallery"
            >
              <ArrowLeft size={16} />
              <span>Back to Gallery</span>
            </button>

            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Alpha Elevators" className="h-6 w-auto opacity-90" />
              <div className="hidden md:flex items-center text-xs text-white/40 font-mono tracking-wider gap-1.5">
                <span>/</span>
                <span className="text-white/70">CATALOG</span>
                <span>/</span>
                <span className="text-accent font-semibold">{currentProduct.id}</span>
              </div>
            </div>
          </div>

          {/* Quick Model Selector Pills */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setActiveProductIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-display tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  idx === activeProductIdx
                    ? 'bg-accent text-[#07090d] font-bold shadow-[0_0_12px_rgba(0,204,204,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <span>{prod.id}</span>
                <span className="hidden lg:inline text-[10px] font-mono opacity-80 font-normal">
                  ({prod.num})
                </span>
              </button>
            ))}
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-semibold cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Product Overview / Amazon Buy Box Main Section ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8">
        
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-4 overflow-x-auto">
          <span className="hover:text-accent cursor-pointer" onClick={onBack}>Alpha Elevators</span>
          <span>&gt;</span>
          <span>Residential Home Lifts</span>
          <span>&gt;</span>
          <span>{currentProduct.series}</span>
          <span>&gt;</span>
          <span className="text-white/80 font-semibold">{currentProduct.name}</span>
        </div>

        {/* 2-Column Grid: Left (Gallery + Zoom + Colors) | Right (Buy Box + Specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ═════════════════════════════════════════════════════════
              LEFT COLUMN: Product Images, Draggable Rail, Color Swap
          ═════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:sticky lg:top-24">
            
            {/* Interactive Demo Buttons (Overall, Pit & Mechanism) */}
            {activeVideos && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-gradient-to-r from-accent/15 via-[#0d1117] to-white/[0.02] border border-accent/40 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                    {selectedColor.id.includes('black') ? 'Black Edition ' : 'Hydraulic '}Engineering Demos:
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Photo Mode Button */}
                  <button
                    type="button"
                    onClick={() => setActiveVideoMode(null)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeVideoMode === null
                        ? 'bg-white/20 text-white font-bold border border-white/30 shadow-sm'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Layers size={13} />
                    <span>Photos</span>
                  </button>

                  {/* Overall Button */}
                  {activeVideos.overall && (
                    <button
                      type="button"
                      onClick={() => setActiveVideoMode(activeVideoMode === 'overall' ? null : 'overall')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeVideoMode === 'overall'
                          ? 'bg-accent text-black font-extrabold shadow-[0_0_18px_rgba(0,204,204,0.6)] ring-2 ring-accent'
                          : 'bg-accent/15 text-accent hover:bg-accent hover:text-black border border-accent/40 hover:border-accent'
                      }`}
                      title="Play Overall Video Showcase on Loop"
                    >
                      <Play size={13} className={activeVideoMode === 'overall' ? 'fill-black text-black' : 'fill-accent text-accent'} />
                      <span>Overall</span>
                    </button>
                  )}

                  {/* Pit Button */}
                  {activeVideos.pit && (
                    <button
                      type="button"
                      onClick={() => setActiveVideoMode(activeVideoMode === 'pit' ? null : 'pit')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeVideoMode === 'pit'
                          ? 'bg-accent text-black font-extrabold shadow-[0_0_18px_rgba(0,204,204,0.6)] ring-2 ring-accent'
                          : 'bg-accent/15 text-accent hover:bg-accent hover:text-black border border-accent/40 hover:border-accent'
                      }`}
                      title="Play Pit Video Demonstration"
                    >
                      <Play size={13} className={activeVideoMode === 'pit' ? 'fill-black text-black' : 'fill-accent text-accent'} />
                      <span>Pit</span>
                    </button>
                  )}

                  {/* Mechanism Button */}
                  {activeVideos.mechanism && (
                    <button
                      type="button"
                      onClick={() => setActiveVideoMode(activeVideoMode === 'mechanism' ? null : 'mechanism')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeVideoMode === 'mechanism'
                          ? 'bg-accent text-black font-extrabold shadow-[0_0_18px_rgba(0,204,204,0.6)] ring-2 ring-accent'
                          : 'bg-accent/15 text-accent hover:bg-accent hover:text-black border border-accent/40 hover:border-accent'
                      }`}
                      title="Play Mechanism Video Demonstration"
                    >
                      <Cog size={13} className={activeVideoMode === 'mechanism' ? 'animate-spin text-black' : 'text-accent'} />
                      <span>Mechanism</span>
                    </button>
                  )}

                  {/* Switch between Black and Normal Button */}
                  {selectedColor.id.includes('black') ? (
                    <button
                      type="button"
                      onClick={handleSwitchToNormalVideo}
                      className="px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer bg-white/15 hover:bg-accent hover:text-black text-white border border-white/30 hover:border-accent shadow-sm"
                      title="Switch to Normal Hydraulic Video"
                    >
                      <RotateCcw size={13} className="text-accent group-hover:text-black" />
                      <span>Normal Video</span>
                    </button>
                  ) : (
                    currentProduct.colors.some((c) => c.id.includes('black')) && (
                      <button
                        type="button"
                        onClick={handleSwitchToBlackVideo}
                        className="px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer bg-black/80 hover:bg-black text-white border border-white/25 hover:border-accent shadow-sm"
                        title="Switch to Black Lift Video"
                      >
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span>Black Video</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Main Stage: Hero Image/Video Viewer with Interactive Zoom Magnifier */}
            <div 
              ref={imageContainerRef}
              onMouseEnter={() => !activeVideoMode && setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className={`relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group select-none ${
                activeVideoMode ? 'cursor-default' : 'cursor-crosshair'
              }`}
            >
              {/* Product Badges (Shown when in Photo mode) */}
              {!activeVideoMode && (
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                  <span className="px-3 py-1 rounded bg-amber-500/90 text-black font-extrabold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1 w-fit">
                    <Award size={12} />
                    <span>{currentProduct.badge}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-accent border border-accent/30 font-mono text-[10px] tracking-widest uppercase w-fit">
                    194 Safety Parameters
                  </span>
                </div>
              )}

              {/* Action Icons Overlay (Top Right: Video Demo & Demo Toggles) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                {activeVideos?.overall && (
                  <button
                    type="button"
                    onClick={() => setActiveVideoMode(activeVideoMode === 'overall' ? null : 'overall')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 shadow-md cursor-pointer ${
                      activeVideoMode === 'overall'
                        ? 'bg-accent text-black font-bold ring-2 ring-accent'
                        : 'bg-black/70 hover:bg-accent hover:text-black border border-white/20 text-white'
                    }`}
                    title="Play Overall Video on Loop"
                  >
                    <Play size={12} className={activeVideoMode === 'overall' ? 'fill-black text-black' : 'fill-accent text-accent'} />
                    <span>Overall</span>
                  </button>
                )}

                {activeVideos?.pit && (
                  <button
                    type="button"
                    onClick={() => setActiveVideoMode(activeVideoMode === 'pit' ? null : 'pit')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 shadow-md cursor-pointer ${
                      activeVideoMode === 'pit'
                        ? 'bg-accent text-black font-bold ring-2 ring-accent'
                        : 'bg-black/70 hover:bg-accent hover:text-black border border-white/20 text-white'
                    }`}
                    title="Play Pit Video Demonstration"
                  >
                    <Play size={12} className={activeVideoMode === 'pit' ? 'fill-black text-black' : 'fill-accent text-accent'} />
                    <span>Pit</span>
                  </button>
                )}

                {activeVideos?.mechanism && (
                  <button
                    type="button"
                    onClick={() => setActiveVideoMode(activeVideoMode === 'mechanism' ? null : 'mechanism')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 shadow-md cursor-pointer ${
                      activeVideoMode === 'mechanism'
                        ? 'bg-accent text-black font-bold ring-2 ring-accent'
                        : 'bg-black/70 hover:bg-accent hover:text-black border border-white/20 text-white'
                    }`}
                    title="Play Drive Mechanism Video"
                  >
                    <Cog size={13} className={activeVideoMode === 'mechanism' ? 'animate-spin text-black' : 'text-accent'} />
                    <span>Mechanism</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-accent hover:text-black border border-white/20 hover:border-accent text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 shadow-md cursor-pointer"
                  title="Watch Video Tour"
                >
                  <Play size={13} className="fill-current text-accent group-hover:text-black" />
                  <span className="hidden sm:inline">Tour</span>
                </button>
              </div>

              {/* ── VIDEO PLAYER AT PRODUCT IMAGE PLACE ── */}
              {activeVideoMode ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    key={`${selectedColor?.id || 'default'}-${activeVideoMode}`}
                    src={
                      activeVideoMode === 'pit'
                        ? (activeVideos?.pit || '/lifts/hydraulic-pit.mp4')
                        : activeVideoMode === 'mechanism'
                        ? (activeVideos?.mechanism || '/lifts/hydraulic-mechanism.mp4')
                        : (activeVideos?.overall || '/lifts/hydraulic-overall.mp4')
                    }
                    autoPlay
                    loop={activeVideoMode !== 'pit'}
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-contain bg-black"
                  />
                  {/* Top Left Playing Status Pill */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded bg-black/85 backdrop-blur-md border border-accent/40 text-accent font-mono text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span>
                        {selectedColor.id.includes('black') ? 'Black Edition ' : 'Hydraulic '}
                        {activeVideoMode === 'pit'
                          ? 'Pit 150mm View'
                          : activeVideoMode === 'mechanism'
                          ? 'Drive Mechanism View'
                          : '360° Overall Tour'}
                      </span>
                    </span>
                  </div>

                  {/* Return to Photos Button */}
                  <button
                    type="button"
                    onClick={() => setActiveVideoMode(null)}
                    className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-lg bg-black/85 hover:bg-accent hover:text-black border border-white/20 hover:border-accent text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 shadow-xl cursor-pointer"
                  >
                    <X size={14} />
                    <span>Back to Photo</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Architectural Image with Increased Size for AE01 */}
                  <img
                    src={activeImage}
                    alt={currentProduct.name}
                    className={`w-full h-full ${
                      currentProduct.id === 'AE01'
                        ? 'object-contain p-2 sm:p-4 scale-110 sm:scale-125'
                        : 'object-cover'
                    } transition-all duration-300 transform ${
                      isZooming ? 'opacity-0' : 'opacity-100'
                    }`}
                  />

                  {/* Magnified Zoom Image View (Amazon-style hover lens) */}
                  {isZooming && (
                    <div
                      className="absolute inset-0 bg-no-repeat pointer-events-none transition-all duration-75"
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                        backgroundSize: '240%'
                      }}
                    />
                  )}

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-3.5 py-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                    <span className="text-white/90 font-medium truncate">{activeCaption}</span>
                    <span className="text-white/40 text-[10px] font-mono tracking-wider uppercase ml-2 shrink-0">
                      Hover to Zoom
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* ── Draggable Thumbnail Rail (Left side images drag to show) ── */}
            <div className="relative w-full bg-[#0d1117] p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-accent" />
                  <span className="text-xs font-display uppercase tracking-wider text-white/70 font-semibold">
                    Product Perspectives &amp; Finishes
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/40">
                  Drag or scroll to view ({allMediaItems.length})
                </span>
              </div>

              <div className="relative group/rail flex items-center">
                {/* Scroll left button */}
                <button
                  type="button"
                  onClick={() => scrollThumbnails('left')}
                  className="absolute left-0 z-20 w-8 h-12 bg-black/80 hover:bg-accent hover:text-black text-white flex items-center justify-center rounded-l-md border border-white/20 transition-all opacity-80 hover:opacity-100 shadow-md cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Draggable Rail */}
                <div
                  ref={thumbnailRailRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeaveThumb}
                  onMouseUp={handleMouseUpThumb}
                  onMouseMove={handleMouseMoveThumb}
                  className="flex items-center gap-3 overflow-x-auto py-1 px-8 scroll-smooth select-none cursor-grab active:cursor-grabbing scrollbar-none w-full"
                >
                  {allMediaItems.map((item, idx) => {
                    const isSelected = item.isVideo
                      ? activeVideoMode === item.videoMode
                      : (activeVideoMode === null && activeImage === item.url)
                    return (
                      <button
                        key={`${item.url}-${item.caption}-${idx}`}
                        type="button"
                        onClick={() => {
                          if (item.isVideo && item.videoMode) {
                            setActiveVideoMode(item.videoMode)
                          } else if (item.isColor && item.colorId) {
                            const foundColor = currentProduct.colors.find((c) => c.id === item.colorId)
                            if (foundColor) {
                              handleColorSelect(foundColor)
                            } else {
                              setActiveVideoMode(null)
                              setActiveImage(item.url)
                              setActiveCaption(item.caption)
                            }
                          } else {
                            setActiveVideoMode(null)
                            setActiveImage(item.url)
                            setActiveCaption(item.caption)
                          }
                        }}
                        className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-accent shadow-[0_0_12px_rgba(0,204,204,0.5)] scale-105'
                            : 'border-white/15 hover:border-white/40 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={item.caption}
                          className="w-full h-full object-cover pointer-events-none"
                        />
                        {item.isColor && (
                          <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border border-black/80 bg-accent shadow" />
                        )}
                        {item.isVideo && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1">
                            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent flex items-center justify-center shadow">
                              <Play size={12} className="fill-accent text-accent translate-x-[0.5px]" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white font-bold drop-shadow">
                              {item.videoMode === 'pit' ? 'Pit' : item.videoMode === 'mechanism' ? 'Mechanism' : 'Overall'}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                      </button>
                    )
                  })}
                </div>

                {/* Scroll right button */}
                <button
                  type="button"
                  onClick={() => scrollThumbnails('right')}
                  className="absolute right-0 z-20 w-8 h-12 bg-black/80 hover:bg-accent hover:text-black text-white flex items-center justify-center rounded-r-md border border-white/20 transition-all opacity-80 hover:opacity-100 shadow-md cursor-pointer"
                  title="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* ── Different Color Swatch Feature ("show the different color img feature") ── */}
            <div className="w-full bg-[#0d1117] p-4.5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-white/50">
                    Color / Architectural Finish:
                  </span>
                  <span className="text-sm font-semibold text-accent font-display tracking-wider">
                    {selectedColor.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/40">
                  {selectedColor.tag}
                </span>
              </div>

              {/* Color Swatch Tiles - Exactly matching Product Perspectives & Finishes thumbnail size & edge-to-edge fill */}
              <div className="flex flex-wrap items-start gap-4 pt-1">
                {currentProduct.colors.map((color) => {
                  const isCurrent = selectedColor.id === color.id
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleColorSelect(color)}
                      className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                          isCurrent
                            ? 'border-accent shadow-[0_0_16px_rgba(0,204,204,0.6)] scale-105 ring-2 ring-accent'
                            : 'border-white/15 hover:border-white/40 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={color.image}
                          alt={color.name}
                          className="w-full h-full object-cover pointer-events-none"
                        />
                        <div
                          className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full border border-black shadow"
                          style={{ backgroundColor: color.hex }}
                        />
                        {(color.customVideos?.overall || currentProduct.customVideos?.overall) && (
                          <div className="absolute bottom-1 left-1 right-1 bg-black/80 backdrop-blur-sm rounded px-1 py-0.5 text-[9px] font-mono uppercase text-accent font-bold text-center flex items-center justify-center gap-1 shadow">
                            <Play size={9} className="fill-accent text-accent" />
                            <span>Video</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                      </div>
                      <div className="text-center w-20 sm:w-24">
                        <p className={`text-xs sm:text-sm font-bold truncate transition-colors ${isCurrent ? 'text-accent' : 'text-white/80 group-hover:text-white'}`}>
                          {color.name}
                        </p>
                        <p className="text-[10px] text-white/50 font-mono truncate">
                          {color.tag}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                <Truck size={18} className="text-accent mb-1" />
                <span className="text-xs font-semibold text-white">48-72h Install</span>
                <span className="text-[10px] text-white/40 mt-0.5">Zero Civil Pit Needed</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                <Wrench size={18} className="text-accent mb-1" />
                <span className="text-xs font-semibold text-white">10-Yr Reliability</span>
                <span className="text-[10px] text-white/40 mt-0.5">Low Maintenance AMC</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                <ShieldCheck size={18} className="text-accent mb-1" />
                <span className="text-xs font-semibold text-white">EN 81-41 Certified</span>
                <span className="text-[10px] text-white/40 mt-0.5">European Standards</span>
              </div>
            </div>

          </div>

          {/* ═════════════════════════════════════════════════════════
              RIGHT COLUMN: Buy Box, Amazon Title, Pricing & Specs
          ═════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Title & Ratings Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-accent/15 border border-accent/40 text-accent font-mono text-[10px] tracking-wider uppercase font-semibold">
                  {currentProduct.id} SERIES
                </span>
                <span className="text-xs text-white/40 font-mono tracking-wider">
                  Model No: ALPHA-{currentProduct.id}-2026
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white font-bold leading-tight">
                {currentProduct.name}
              </h1>
              <p className="text-sm text-accent/90 mt-1 font-medium font-sans">
                {currentProduct.tagline}
              </p>

              {/* Star Rating & Verified Reviews Count */}
              <div className="flex items-center gap-3 mt-3.5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-1.5">
                    {currentProduct.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-white/20">|</span>
                <span className="text-xs text-accent hover:underline cursor-pointer">
                  {currentProduct.reviewsCount} verified homeowner ratings
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  ✓ Verified Quality
                </span>
              </div>
            </div>

            {/* ── Price & Quotation Breakdown Card ── */}
            <div className="p-5 rounded-xl bg-gradient-to-b from-[#111622] to-[#0c0f17] border border-white/15 shadow-xl space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/50 block font-mono">
                    Base System Investment
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                      {currentProduct.startingPrice}
                    </span>
                    <span className="text-xs text-white/40 font-light">onwards*</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-medium block">
                    {currentProduct.pricingBadge || 'Direct Manufacturer Pricing'}
                  </span>
                  <span className="text-[11px] text-white/50 font-mono block">
                    {currentProduct.paymentTerms || 'Stage-wise Milestone Payments'}
                  </span>
                </div>
              </div>

              {/* Door Opening Surcharge Notification */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">Door Opening Notice:</span>
                  <span className="text-slate-300">Extra per opening Door:</span>
                </div>
                <span className="font-extrabold text-amber-300 text-sm font-mono">
                  ₹80,000
                </span>
              </div>

              {/* Free Assessment Guarantee */}
              <div className="text-xs text-white/70 space-y-1.5 pt-1">
                <p className="flex items-center gap-2">
                  <Check size={14} className="text-accent shrink-0" />
                  <span>Includes primary machinery, electrical control &amp; structural columns</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check size={14} className="text-accent shrink-0" />
                  <span>Complimentary on-site structural shaft laser survey within 24 hours</span>
                </p>
              </div>

              {/* Interactive Floor Configuration Selector */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                  Select Desired Floor Travel:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['G+1 (2 Stops)', 'G+2 (3 Stops)', 'G+3 (4 Stops)'].map((fl) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setSelectedFloors(fl)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-mono transition-all text-center border cursor-pointer ${
                        selectedFloors === fl
                          ? 'border-accent bg-accent/15 text-accent font-bold'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onRequestConsultation) {
                      onRequestConsultation({
                        modelName: currentProduct.name,
                        id: currentProduct.id,
                        budget: currentProduct.startingPrice
                      })
                    } else {
                      setIsQuoteModalOpen(true)
                    }
                  }}
                  className="w-full py-4 px-6 rounded-xl bg-accent text-[#07090d] font-bold text-xs uppercase tracking-[0.2em] font-display hover:bg-white transition-all shadow-[0_0_20px_rgba(0,204,204,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Request Instant Fixed Quote</span>
                  <ArrowRight size={16} />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Quote</span>
                  </button>

                  <a
                    href="tel:+918015129224"
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={15} className="text-accent" />
                    <span>Call Engineer</span>
                  </a>
                </div>
              </div>

            </div>

            {/* ── Key Technical Summary Tiles (Quick Glances) ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Max Floors</span>
                <span className="text-base font-bold text-white font-display mt-0.5 block">
                  {currentProduct.specs.find(s => s.label === 'Maximum Floors')?.value || 'G+3'}
                </span>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Rated Load</span>
                <span className="text-base font-bold text-white font-display mt-0.5 block">
                  440 kg (5-6 Pax)
                </span>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Power Supply</span>
                <span className="text-base font-bold text-accent font-display mt-0.5 block">
                  Single Phase
                </span>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Min Pit Depth</span>
                <span className="text-base font-bold text-white font-display mt-0.5 block">
                  {currentProduct.specs.find(s => s.label === 'Minimum Pit Depth')?.value || '150mm'}
                </span>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Max Speed</span>
                <span className="text-base font-bold text-white font-display mt-0.5 block">
                  {currentProduct.specs.find(s => s.label === 'Maximum Speed')?.value || 'upto 1m/s'}
                </span>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Machine Room</span>
                <span className="text-base font-bold text-emerald-400 font-display mt-0.5 block">
                  Not Required
                </span>
              </div>
            </div>

            {/* ── Amazon-Style "About This Item" Bullet Highlights ── */}
            <div className="p-5 rounded-xl bg-[#0d1117] border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 font-bold">
                About this Elevator Model:
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                {currentProduct.description}
              </p>
              <ul className="space-y-2 pt-2 border-t border-white/5">
                {currentProduct.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                    <span className="text-accent mt-0.5 shrink-0">✔</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════
            TECHNICAL SPECIFICATIONS TABLE (From 4 user images)
        ═════════════════════════════════════════════════════════ */}
        <section className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-1">
                Technical Data Sheet
              </span>
              <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wide font-bold text-white">
                {currentProduct.name} — Technical Details
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-accent hover:text-black border border-white/15 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer w-fit"
            >
              <Download size={14} />
              <span>Download Architectural CAD / PDF</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0d1117] shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#121722] text-white/60 font-mono uppercase text-[11px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-6 w-1/2">Technical Parameter</th>
                  <th className="py-4 px-6 w-1/2">Specification Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentProduct.specs.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-white/[0.03] ${
                      item.highlight ? 'bg-accent/[0.04]' : idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                    }`}
                  >
                    <td className="py-3.5 px-6 font-medium text-white/80 flex items-center gap-2">
                      {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                      <span>{item.label}</span>
                    </td>
                    <td className="py-3.5 px-6 text-white font-mono font-semibold">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            COMPARE ALL 4 MODELS SIDE-BY-SIDE (Amazon Comparison Matrix)
        ═════════════════════════════════════════════════════════ */}
        <section className="mt-20 pt-12 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-1">
              Side-By-Side Engineering Matrix
            </span>
            <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wide font-bold text-white">
              Compare Alpha Home Lift Models
            </h2>
            <p className="text-xs sm:text-sm text-metal mt-2">
              Compare power consumption, maximum stops, pit depths, and architectural flexibility across our range.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/15 bg-[#0d1117] shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
              <thead className="bg-[#121722] border-b border-white/10">
                <tr>
                  <th className="py-5 px-6 text-white/50 font-mono uppercase text-xs">Feature</th>
                  {PRODUCTS.map((prod, i) => (
                    <th
                      key={prod.id}
                      className={`py-5 px-6 text-center ${
                        i === activeProductIdx ? 'bg-accent/15 border-x border-accent/40' : ''
                      }`}
                    >
                      <span className="text-[10px] font-mono text-accent block uppercase">{prod.id}</span>
                      <span className="text-sm font-bold text-white block mt-0.5">{prod.name.replace(' - HOME LIFT', '').replace(' HOME LIFT', '')}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProductIdx(i)
                          window.scrollTo({ top: 300, behavior: 'smooth' })
                        }}
                        className={`mt-2 px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                          i === activeProductIdx
                            ? 'bg-accent text-black font-bold shadow'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {i === activeProductIdx ? 'Active Model' : 'View Model'}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 font-mono text-xs">
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Drive System</td>
                  <td className="py-3 px-6 text-center text-white">Hydraulic</td>
                  <td className="py-3 px-6 text-center text-white">Gearless with Rope</td>
                  <td className="py-3 px-6 text-center text-white">Gearless Belt Driven</td>
                  <td className="py-3 px-6 text-center text-accent font-bold">Gearless Belt (EV)</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Maximum Floors</td>
                  <td className="py-3 px-6 text-center text-white">G+3</td>
                  <td className="py-3 px-6 text-center text-white">G+5</td>
                  <td className="py-3 px-6 text-center text-white">G+5</td>
                  <td className="py-3 px-6 text-center text-white">G+4</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Maximum Stops</td>
                  <td className="py-3 px-6 text-center text-white">4</td>
                  <td className="py-3 px-6 text-center text-white">6</td>
                  <td className="py-3 px-6 text-center text-white">6</td>
                  <td className="py-3 px-6 text-center text-white">5</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Min Pit Depth</td>
                  <td className="py-3 px-6 text-center text-emerald-400 font-bold">150mm</td>
                  <td className="py-3 px-6 text-center text-white">250mm</td>
                  <td className="py-3 px-6 text-center text-white">250mm</td>
                  <td className="py-3 px-6 text-center text-white">250mm</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Min Headroom</td>
                  <td className="py-3 px-6 text-center text-white">2800mm</td>
                  <td className="py-3 px-6 text-center text-white">3000mm</td>
                  <td className="py-3 px-6 text-center text-emerald-400 font-bold">2400mm</td>
                  <td className="py-3 px-6 text-center text-white">3000mm</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Maximum Speed</td>
                  <td className="py-3 px-6 text-center text-white">upto 0.5m/s</td>
                  <td className="py-3 px-6 text-center text-white">upto 1m/s</td>
                  <td className="py-3 px-6 text-center text-white">upto 1m/s</td>
                  <td className="py-3 px-6 text-center text-white">upto 1m/s</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Machine Room</td>
                  <td className="py-3 px-6 text-center text-emerald-400">Not Required</td>
                  <td className="py-3 px-6 text-center text-emerald-400">Not Required</td>
                  <td className="py-3 px-6 text-center text-emerald-400">Not Required</td>
                  <td className="py-3 px-6 text-center text-emerald-400">Not Required</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Power Supply</td>
                  <td className="py-3 px-6 text-center text-white">Single Phase</td>
                  <td className="py-3 px-6 text-center text-white">Single Phase</td>
                  <td className="py-3 px-6 text-center text-white">Single Phase</td>
                  <td className="py-3 px-6 text-center text-accent font-bold">Single Phase + Li-Ion</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-sans font-medium text-white/70">Base Investment</td>
                  <td className="py-4 px-6 text-center font-bold text-white">₹8,50,000</td>
                  <td className="py-4 px-6 text-center font-bold text-white">₹12,00,000</td>
                  <td className="py-4 px-6 text-center font-bold text-white">₹18,00,000</td>
                  <td className="py-4 px-6 text-center font-bold text-accent">₹22,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            CUSTOMER REVIEWS & TESTIMONIALS
        ═════════════════════════════════════════════════════════ */}
        <section className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-1">
                Verified South India Residences
              </span>
              <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wide font-bold text-white">
                Customer Reviews &amp; Experiences
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-white/70">4.9 out of 5 stars based on 620+ installations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    Verified Homeowner
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  "Zero pit installation in our ECR Chennai beach house was flawless."
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  We had no space to dig a pit because of high groundwater. Alpha Elevators installed their Hydraulic model with zero civil digging. Completed in just 3 days!
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/50 font-mono">
                <span>Dr. R. Natarajan — ECR, Chennai</span>
                <span>AE01 Hydraulic</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    Verified Homeowner
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  "Whisper quiet and runs on normal single phase power!"
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  The patented belt model is totally noiseless. Our grandparents use it 20 times a day with zero effort. The soft black finish matches our contemporary interior design.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/50 font-mono">
                <span>V. Karthik — RS Puram, Coimbatore</span>
                <span>AE03 Belt Drive</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    Verified Homeowner
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  "During power blackouts, the lithium battery works like magic."
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  The EV model saved us during grid cuts in monsoon season. Up to 10 days backup is incredible. We run it directly on our villa rooftop solar system.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/50 font-mono">
                <span>Sunil Rao — Indiranagar, Bangalore</span>
                <span>EV01 Model</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── Fixed Bottom Mobile Bar ─── */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#0b0e14]/95 border-t border-white/10 p-3 sm:hidden backdrop-blur-lg flex items-center justify-between gap-3 shadow-2xl">
        <div className="truncate">
          <p className="text-xs font-bold text-white truncate">{currentProduct.name}</p>
          <p className="text-[11px] text-accent font-mono">{currentProduct.startingPrice} onwards</p>
        </div>
        <button
          type="button"
          onClick={() => setIsQuoteModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-accent text-black font-bold text-xs uppercase tracking-wider font-display shrink-0 shadow-lg cursor-pointer"
        >
          Get Quote
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════
          QUOTATION & FEASIBILITY CONSULTATION MODAL
      ═════════════════════════════════════════════════════════ */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0d1117] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => {
                setIsQuoteModalOpen(false)
                setQuoteSubmitted(false)
              }}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {!quoteSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setQuoteSubmitted(true)
                }}
                className="space-y-4"
              >
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                    Instant Alpha Consultation
                  </span>
                  <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white mt-0.5">
                    Request Quote: {currentProduct.name}
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Selected finish: <strong className="text-accent">{selectedColor.name}</strong> • Travel: {selectedFloors}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-white/70 font-mono mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/30 focus:border-accent focus:outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-mono mb-1">WhatsApp / Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98400 12345"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/30 focus:border-accent focus:outline-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 font-mono mb-1">City / Location *</label>
                      <select
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#141923] border border-white/15 text-white focus:border-accent focus:outline-none"
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Other">Other South India</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/70 font-mono mb-1">Door Configuration</label>
                      <select
                        value={selectedDoorOpening}
                        onChange={(e) => setSelectedDoorOpening(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#141923] border border-white/15 text-white focus:border-accent focus:outline-none text-[11px]"
                      >
                        <option value="Standard Inline">Standard Inline (Included)</option>
                        <option value="Opposite Door (+₹80,000)">Opposite Door (+₹80,000)</option>
                        <option value="Adjacent Door (+₹80,000)">Adjacent Door (+₹80,000)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-accent text-[#07090d] font-bold text-xs uppercase tracking-widest font-display hover:bg-white transition-all shadow-lg cursor-pointer"
                  >
                    Submit Quotation Request
                  </button>
                  <p className="text-[10px] text-white/40 font-mono text-center mt-2">
                    Our Senior Elevator Consultant will reach out within 2 hours.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white">
                  Consultation Request Received!
                </h3>
                <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{clientName || 'valued client'}</strong>. Our {clientCity} regional engineering supervisor has been notified for your {currentProduct.name} inquiry.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuoteModalOpen(false)
                      setQuoteSubmitted(false)
                    }}
                    className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════
          VIDEO DEMO MODAL (Future Video Join Slot)
      ═════════════════════════════════════════════════════════ */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#0d1117] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play size={16} className="text-accent" />
                <span className="text-xs font-display uppercase tracking-wider text-white font-bold">
                  {currentProduct.name} — 4K Motion Demonstration
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {currentProduct.videoPlaceholderUrl ? (
                <video
                  src={currentProduct.videoPlaceholderUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Play size={48} className="text-accent/60 mb-3 animate-pulse" />
                  <p className="text-sm font-display uppercase tracking-widest text-white">
                    4K Video Demonstration Ready For Integration
                  </p>
                  <p className="text-xs text-white/50 mt-1 max-w-md">
                    Custom footage for {currentProduct.name} will stream here seamlessly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer className="mt-24 py-10 px-6 border-t border-white/10 text-center text-xs text-white/30 font-mono uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Alpha Elevators. All Rights Reserved. Engineered for Precision.
      </footer>
    </div>
  )
}
