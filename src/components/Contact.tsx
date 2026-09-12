export const Contact = () => {
  return (
    <section className="min-h-screen relative z-10 w-full flex items-center py-32" id="contact">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Empty left side to allow the 3D control panel to be visible */}
          <div className="hidden lg:block"></div>
          
          <div className="bg-primary/80 backdrop-blur-md p-10 border border-white/5 rounded-2xl">
            <h2 className="text-4xl font-display text-accent mb-2">Get in Touch</h2>
            <p className="text-metal mb-8 font-light">Experience the future of vertical mobility.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <span className="text-accent text-xl">✆</span>
                </div>
                <div>
                  <div className="text-sm font-mono text-white/50 tracking-widest mb-1">CALL US</div>
                  <a href="tel:+918015129224" className="text-lg text-white hover:text-accent transition-colors">+91 80151 29224</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <span className="text-accent text-xl">✉</span>
                </div>
                <div>
                  <div className="text-sm font-mono text-white/50 tracking-widest mb-1">EMAIL</div>
                  <a href="mailto:info@alphaelevators.in" className="text-lg text-white hover:text-accent transition-colors">info@alphaelevators.in</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <span className="text-accent text-xl">⌂</span>
                </div>
                <div>
                  <div className="text-sm font-mono text-white/50 tracking-widest mb-1">HEAD OFFICE</div>
                  <address className="text-white/80 font-light not-italic leading-relaxed">
                    99, A-Block, Annanagar,<br/>
                    Anna Nagar East,<br/>
                    Chennai 600 102
                  </address>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-10 py-4 bg-accent text-primary font-semibold tracking-widest uppercase hover:bg-white transition-colors duration-300">
              Request a Callback
            </button>
          </div>
        </div>
        
      </div>
    </section>
  )
}
