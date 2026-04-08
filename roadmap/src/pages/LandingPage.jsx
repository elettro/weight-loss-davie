import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import CTASection from '../components/CTASection';

function LandingPage() {
  return (
    <div className="page-stack">
      <HeroSection />
      <FeatureCards />
      <section className="section-card split-feature">
        <div>
          <p className="eyebrow">Calculator-first workflow</p>
          <h2>Start with your profile. Leave with a realistic, month-by-month plan.</h2>
        </div>
        <p>
          The roadmap engine blends your metrics, clinical context, habits, and medication preference into a clear
          projection you can discuss with your provider.
        </p>
      </section>
      <CTASection
        title="Ready to map your next 3-12 months?"
        text="Run your roadmap now and continue tracking performance across timeline and cost views."
      />
    </div>
  );
}

export default LandingPage;
