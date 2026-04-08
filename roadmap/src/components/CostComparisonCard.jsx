function CostComparisonCard({ title, data }) {
  return (
    <article className="section-card cost-card">
      <h3>{title}</h3>
      <p>
        <span>Monthly cost</span>
        <strong>${data.monthlyCost.toFixed(0)}</strong>
      </p>
      <p>
        <span>Total projected investment</span>
        <strong>${data.totalInvestment.toFixed(0)}</strong>
      </p>
      <p>
        <span>Cost per pound lost</span>
        <strong>${data.costPerPound.toFixed(2)}</strong>
      </p>
    </article>
  );
}

export default CostComparisonCard;
