const medicationProfiles = {
  Semaglutide: { monthlyCost: 449, baseLossRate: 0.013 },
  Tirzepatide: { monthlyCost: 599, baseLossRate: 0.016 }
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getLifestyleMultiplier({ activityLevel, proteinCompliance, sleepHours }) {
  const activityBoost = {
    Minimal: 0.92,
    Light: 0.98,
    Moderate: 1.04,
    High: 1.08
  }[activityLevel] ?? 1;

  const proteinBoost = 0.9 + clamp(Number(proteinCompliance) / 100, 0, 1) * 0.2;
  const sleepBoost = clamp(Number(sleepHours) / 7, 0.85, 1.08);

  return activityBoost * proteinBoost * sleepBoost;
}

function getClinicalAdjustment({ insulinResistance, metabolicCondition }) {
  const insulinMap = { Low: 1.02, Moderate: 0.98, High: 0.93 };
  const conditionMap = {
    None: 1,
    Prediabetes: 0.97,
    'Type 2 Diabetes': 0.95,
    PCOS: 0.96
  };

  return (insulinMap[insulinResistance] ?? 1) * (conditionMap[metabolicCondition] ?? 1);
}

export function calculateRoadmap(inputs) {
  // Placeholder model: replace with validated clinical/business formulas.
  const currentWeight = Number(inputs.currentWeight);
  const goalWeight = Number(inputs.goalWeight);
  const medication = inputs.medication || 'Semaglutide';
  const monthlyBudget = Number(inputs.monthlyBudget || 0);

  const profile = medicationProfiles[medication] ?? medicationProfiles.Semaglutide;
  const weightToLose = Math.max(currentWeight - goalWeight, 0);
  const monthlyRate =
    currentWeight *
    profile.baseLossRate *
    getLifestyleMultiplier(inputs) *
    getClinicalAdjustment(inputs);

  const adjustedMonthlyLoss = Math.max(monthlyRate, 1.5);
  const estimatedMonths = weightToLose > 0 ? Math.ceil(weightToLose / adjustedMonthlyLoss) : 0;

  const milestones = Array.from({ length: Math.max(estimatedMonths, 1) }, (_, idx) => {
    const month = idx + 1;
    const projectedWeight = Math.max(currentWeight - adjustedMonthlyLoss * month, goalWeight);
    return {
      month,
      projectedWeight: Number(projectedWeight.toFixed(1)),
      cumulativeLost: Number((currentWeight - projectedWeight).toFixed(1))
    };
  });

  const semaCost = medicationProfiles.Semaglutide.monthlyCost * Math.max(estimatedMonths, 1);
  const tirzCost = medicationProfiles.Tirzepatide.monthlyCost * Math.max(estimatedMonths, 1);

  const preferredTotalCost = profile.monthlyCost * Math.max(estimatedMonths, 1);
  const costPerPound = weightToLose > 0 ? preferredTotalCost / weightToLose : profile.monthlyCost;

  const recommendation =
    monthlyBudget >= profile.monthlyCost
      ? 'Budget aligns with your selected pathway. Focus on adherence and monthly checkpoints.'
      : 'Current budget is below projected monthly treatment cost. Consider support financing or phased start.';

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      currentWeight,
      goalWeight,
      weightToLose,
      projectedMonthlyLoss: Number(adjustedMonthlyLoss.toFixed(1)),
      estimatedMonths,
      etaDate: new Date(new Date().setMonth(new Date().getMonth() + estimatedMonths)).toISOString(),
      recommendation
    },
    milestones,
    comparison: {
      semaglutide: {
        monthlyCost: medicationProfiles.Semaglutide.monthlyCost,
        totalInvestment: semaCost,
        costPerPound: weightToLose > 0 ? semaCost / weightToLose : medicationProfiles.Semaglutide.monthlyCost
      },
      tirzepatide: {
        monthlyCost: medicationProfiles.Tirzepatide.monthlyCost,
        totalInvestment: tirzCost,
        costPerPound: weightToLose > 0 ? tirzCost / weightToLose : medicationProfiles.Tirzepatide.monthlyCost
      }
    }
  };
}
