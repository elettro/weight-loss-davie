const features = [
  {
    title: 'Config-driven clinical intake',
    text: 'Flexible field groups make future care-model updates fast and low-risk.'
  },
  {
    title: 'Milestone timeline projections',
    text: 'Monthly checkpoints help align expectations and improve consistency.'
  },
  {
    title: 'Medication value modeling',
    text: 'Compare cost-per-pound and projected investment between pathways.'
  }
];

function FeatureCards() {
  return (
    <section className="feature-grid">
      {features.map((feature) => (
        <article key={feature.title} className="section-card feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </section>
  );
}

export default FeatureCards;
