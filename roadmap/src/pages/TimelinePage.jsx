import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import TimelineChart from '../components/TimelineChart';
import { loadFromStorage, STORAGE_KEYS } from '../utils/storage';

function TimelinePage() {
  const result = loadFromStorage(STORAGE_KEYS.result, null);

  if (!result) {
    return (
      <section className="section-card empty-state">
        <h1>No timeline data yet</h1>
        <p>Generate a roadmap from the calculator to unlock personalized milestones.</p>
        <Link className="btn btn-primary" to="/calculator">
          Start Calculator
        </Link>
      </section>
    );
  }

  const { summary, milestones } = result;
  const goalDate = new Date(summary.etaDate).toLocaleDateString();

  return (
    <div className="page-stack">
      <section className="section-card split-feature">
        <div>
          <p className="eyebrow">Personalized timeline summary</p>
          <h1>{summary.estimatedMonths}-month projection to your target</h1>
          <p>Estimated goal date: {goalDate}</p>
        </div>
        <div className="goal-countdown">
          <span>Goal countdown</span>
          <strong>{summary.estimatedMonths * 30} days</strong>
        </div>
      </section>

      <section className="section-card">
        <h2>Milestone visualization</h2>
        <TimelineChart milestones={milestones} />
      </section>

      <section className="section-card">
        <h2>Milestone list</h2>
        <ul className="milestone-list">
          {milestones.map((milestone) => (
            <li key={milestone.month}>
              <span>Month {milestone.month}</span>
              <strong>{milestone.projectedWeight} lb</strong>
              <small>{milestone.cumulativeLost} lb total loss</small>
            </li>
          ))}
        </ul>
      </section>

      <CTASection
        title="Need to pressure-test cost efficiency?"
        text="Open side-by-side medication economics and delay impact next."
        primaryHref="/comparison"
      />
    </div>
  );
}

export default TimelinePage;
