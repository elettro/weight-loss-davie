function MetricCard({ label, value, detail }) {
  return (
    <article className="section-card metric-card">
      <p>{label}</p>
      <h3>{value}</h3>
      {detail && <small>{detail}</small>}
    </article>
  );
}

export default MetricCard;
