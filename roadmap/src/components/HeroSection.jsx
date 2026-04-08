import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero section-card hero-gradient">
      <div className="hero-copy">
        <p className="eyebrow">Premium clinical planning</p>
        <h1>Build a realistic GLP-1 roadmap with timeline, cost, and progress clarity.</h1>
        <p>
          Move beyond guesswork with guided inputs, visual milestones, and practical cost framing tailored to your
          profile.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/calculator">
            Start Calculator
          </Link>
          <Link className="btn btn-soft" to="/comparison">
            Compare Options
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
