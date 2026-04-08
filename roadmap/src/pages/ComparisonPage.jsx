import { Link } from 'react-router-dom';
import CostComparisonCard from '../components/CostComparisonCard';
import { loadFromStorage, STORAGE_KEYS } from '../utils/storage';

function ComparisonPage() {
  const result = loadFromStorage(STORAGE_KEYS.result, null);

  if (!result) {
    return (
      <section className="section-card empty-state">
        <h1>No comparison data yet</h1>
        <p>Run the calculator to generate medication cost comparisons.</p>
        <Link className="btn btn-primary" to="/calculator">
          Open Calculator
        </Link>
      </section>
    );
  }

  const { comparison, summary } = result;
  const delayCost = summary.projectedMonthlyLoss * 350;

  return (
    <div className="page-stack comparison-layout">
      <section className="section-card comparison-inputs">
        <h1>Cost Comparison</h1>
        <p>Compare projected investment and efficiency between semaglutide and tirzepatide pathways.</p>
        <div className="mini-facts">
          <p>
            <span>Weight loss target</span>
            <strong>{summary.weightToLose} lb</strong>
          </p>
          <p>
            <span>Estimated timeline</span>
            <strong>{summary.estimatedMonths} months</strong>
          </p>
          <p>
            <span>Projected monthly loss</span>
            <strong>{summary.projectedMonthlyLoss} lb</strong>
          </p>
        </div>
      </section>

      <section className="comparison-results">
        <CostComparisonCard title="Semaglutide projection" data={comparison.semaglutide} />
        <CostComparisonCard title="Tirzepatide projection" data={comparison.tirzepatide} />
        <article className="section-card cost-card">
          <h3>Efficiency summary</h3>
          <p>
            <span>Value leader</span>
            <strong>
              {comparison.semaglutide.costPerPound <= comparison.tirzepatide.costPerPound
                ? 'Semaglutide'
                : 'Tirzepatide'}
            </strong>
          </p>
          <p>
            <span>Delay / wait cost framing</span>
            <strong>${delayCost.toFixed(0)} / month</strong>
          </p>
          <small>Placeholder economic framing for planning conversations; replace with your business assumptions.</small>
        </article>
      </section>
    </div>
  );
}

export default ComparisonPage;
