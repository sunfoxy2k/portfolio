import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <div className="min-h-screen relative text-foreground transition-colors">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16 relative z-content">
        <section className="mb-16" id="about">
          <h1 className="text-5xl font-semibold mb-4 text-foreground">Your Name</h1>
          <p className="text-xl text-muted-foreground transition-colors">Full Stack Developer</p>
        </section>

        <section className="mb-16">
          <ChatBot />
        </section>
      </main>
    </div>
  );
}
