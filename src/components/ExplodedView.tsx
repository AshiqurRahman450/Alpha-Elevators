export const ExplodedView = () => {
  return (
    <section className="h-[150vh] relative z-10 w-full" id="explodedview">
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
        
        <div className="text-center mb-8 bg-primary/20 backdrop-blur-sm p-8 rounded-full border border-white/5">
          <h2 className="text-3xl font-display text-white tracking-[0.2em] uppercase">Engineering Architecture</h2>
          <p className="text-metal mt-2 text-sm tracking-widest uppercase">Precision in every component</p>
        </div>

        {/* Labels for the exploded parts (positioned around the center) */}
        <div className="absolute top-[20%] right-[10%] text-right bg-primary/40 backdrop-blur-md p-4 border border-white/5">
          <div className="text-accent font-mono text-xs tracking-widest mb-1">CEILING ASSEMBLY</div>
          <div className="text-white/60 text-xs">LED Lighting & Ventilation</div>
        </div>
        
        <div className="absolute bottom-[30%] left-[10%] text-left bg-primary/40 backdrop-blur-md p-4 border border-white/5">
          <div className="text-accent font-mono text-xs tracking-widest mb-1">STRUCTURAL PANELS</div>
          <div className="text-white/60 text-xs">Sound-dampening reinforced steel</div>
        </div>

      </div>
    </section>
  )
}
