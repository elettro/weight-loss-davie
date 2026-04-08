function TimelineChart({ milestones = [] }) {
  const maxLost = Math.max(...milestones.map((point) => point.cumulativeLost), 1);

  return (
    <div className="timeline-chart">
      {milestones.map((milestone) => (
        <div key={milestone.month} className="timeline-bar-wrap">
          <div className="timeline-value">{milestone.projectedWeight} lb</div>
          <div className="timeline-bar-track">
            <div className="timeline-bar-fill" style={{ height: `${(milestone.cumulativeLost / maxLost) * 100}%` }} />
          </div>
          <span>M{milestone.month}</span>
        </div>
      ))}
    </div>
  );
}

export default TimelineChart;
