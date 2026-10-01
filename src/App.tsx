import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LawsSection from '@/components/LawsSection';
import AboutNewton from '@/components/AboutNewton';
import Quiz from '@/components/Quiz';
import Footer from '@/components/Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <LawsSection />
        <AboutNewton />
        <Quiz />
      </main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}

export default App;
