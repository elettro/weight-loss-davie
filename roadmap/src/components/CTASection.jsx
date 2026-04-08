import { Link } from 'react-router-dom';

function CTASection({ title, text, primaryHref = '/calculator', secondaryHref = '/comparison' }) {
  return (
    <section className="section-card cta-band">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="hero-actions">
        <Link to={primaryHref} className="btn btn-primary">
          Open Calculator
        </Link>
        <Link to={secondaryHref} className="btn btn-soft">
          Review Comparison
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
