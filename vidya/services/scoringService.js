export function calculateIncomeScore(
  income,
  maxIncome
) {
  if (income < 0) {
    return 0;
  }

  if (income >= maxIncome) {
    return 0;
  }

  const score =
    100 - (income / maxIncome) * 100;

  return Number(score.toFixed(2));
}


export function calculateMeritScore(
  application,
  scheme
) {
  const marksScore = application.marks;

  const incomeScore = calculateIncomeScore(
    application.income,
    scheme.maxIncome
  );

  const categoryScore =
    scheme.categoryPriority[
      application.category
    ] || 0;

  const weights =
    scheme.scoringWeights;

  const finalScore =
    marksScore * weights.marks +
    incomeScore * weights.income +
    categoryScore * weights.category;

  return {
    marksScore,
    incomeScore,
    categoryScore,
    finalScore: Number(
      finalScore.toFixed(2)
    )
  };
}