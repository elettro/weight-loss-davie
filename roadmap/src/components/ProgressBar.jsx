function ProgressBar({ label, value }) {
  const normalized = Math.max(0, Math.min(100, value));
  return (
    <div className="progress-row">
      <div className="progress-labels">
        <span>{label}</span>
        <strong>{normalized}%</strong>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={normalized} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
