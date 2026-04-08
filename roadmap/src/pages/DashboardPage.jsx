import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';
import { loadFromStorage, STORAGE_KEYS } from '../utils/storage';

function DashboardPage() {
  const result = loadFromStorage(STORAGE_KEYS.result, null);

  if (!result) {
    return (
      <section className="section-card empty-state">
        <h1>No roadmap generated yet</h1>
        <p>Complete the calculator first to unlock your dashboard insights.</p>
        <Link className="btn btn-primary" to="/calculator">
          Go to Calculator
        </Link>
      </section>
    );
  }

  const { summary, milestones } = result;
  const progressTowardGoal = summary.weightToLose
    ? Math.round((milestones[milestones.length - 1].cumulativeLost / summary.weightToLose) * 100)
    : 100;

  return (
    <div className="page-stack">
      <section className="section-card">
        <h1>Roadmap Dashboard</h1>
        <p>{summary.recommendation}</p>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Weight to lose" value={`${summary.weightToLose.toFixed(1)} lb`} />
        <MetricCard label="Projected monthly loss" value={`${summary.projectedMonthlyLoss} lb`} />
        <MetricCard label="Estimated timeline" value={`${summary.estimatedMonths} months`} />
      </section>

      <section className="section-card">
        <h2>Progress tracker</h2>
        <ProgressBar label="Projected goal completion" value={progressTowardGoal} />
        <ProgressBar label="Timeline confidence" value={summary.estimatedMonths <= 9 ? 82 : 68} />
      </section>

      <section className="section-card support-grid">
        <div>
          <h3>Timeline preview</h3>
          <p>
            Next checkpoint at month {Math.min(3, summary.estimatedMonths)} with projected weight of{' '}
            {milestones[Math.min(2, milestones.length - 1)].projectedWeight} lb.
          </p>
        </div>
        <div>
          <h3>Support focus</h3>
          <p>Emphasize protein consistency, hydration, and weekly movement goals to maintain adherence quality.</p>
        </div>
      </section>

      <CTASection title="Continue into your timeline view" text="See month-by-month trajectory and milestone countdowns." primaryHref="/timeline" />
    </div>
  );
}

export default DashboardPage;
