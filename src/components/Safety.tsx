export const Safety = () => {
  return (
    <section className="min-h-screen relative z-10 w-full flex items-center py-32 bg-secondary" id="safety">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:col-start-2 bg-primary/80 backdrop-blur-md p-10 border border-white/5 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-4 uppercase tracking-wider">
              Safety Isn't a Feature.<br/>
              <span className="text-red-500">It's the Foundation.</span>
            </h2>
            <div className="w-16 h-[1px] bg-red-500 mb-8"></div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-accent font-mono tracking-widest text-sm mb-2">BUILT-IN BACKUP BATTERY</h4>
                <p className="text-metal text-sm font-light leading-relaxed">Secure during power outages or disruptions in electricity supply.</p>
              </div>
              <div>
                <h4 className="text-accent font-mono tracking-widest text-sm mb-2">OVERLOAD & SAFETY SENSOR</h4>
                <p className="text-metal text-sm font-light leading-relaxed">Multiple sensors are fitted around to ensure the lift operates with maximum safety.</p>
              </div>
              <div>
                <h4 className="text-accent font-mono tracking-widest text-sm mb-2">SPEED GOVERNOR</h4>
                <p className="text-metal text-sm font-light leading-relaxed">Prevents elevator over-speed and sudden drops by automatically activating safety brakes.</p>
              </div>
              <div>
                <h4 className="text-accent font-mono tracking-widest text-sm mb-2">DOOR LOCKING SYSTEM</h4>
                <p className="text-metal text-sm font-light leading-relaxed">Electric interlock for all landing doors. Doors open only when cabin has stopped accurately.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
