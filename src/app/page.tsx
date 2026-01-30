import ChatBot from '@/components/ChatBot';
import TechStackIcons from '@/components/TechStackIcons';
import { User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative text-foreground transition-colors">
      {/* Dev-style dot grid background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-16 relative z-content">
        {/* Two-column layout: flex-col-reverse on mobile (chat first), lg:flex-row on desktop */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column - Personal Info */}
          <section className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start" id="about">
            <div className="p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl">
              
              {/* Profile Image Placeholder */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-muted/40 border-2 border-border/50 flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              
              {/* Name with Display Font */}
              <h1 className="text-5xl font-bold mb-3 text-foreground font-[family-name:var(--font-display)] tracking-tight">
                Your Name
              </h1>
              
              {/* Title with accent styling */}
              <p className="text-xl text-accent mb-6 font-medium">
                Senior Full Stack Developer
              </p>
              
              {/* Bio */}
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Building scalable, performant web applications with modern technologies. 
                Passionate about clean code, great DX, and shipping products that matter.
              </p>
              
              {/* Tech Stack Icons - theme-aware colors */}
              <TechStackIcons />
            </div>
          </section>

          {/* Right Column - Chat */}
          <section className="lg:w-2/3">
            <ChatBot />
          </section>
          
        </div>
      </main>
    </div>
  );
}
