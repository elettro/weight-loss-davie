export const calculatorSections = [
  {
    title: 'Physical Metrics',
    description: 'Core measurements used to estimate pace and timeline.',
    fields: [
      {
        id: 'currentWeight',
        label: 'Current Weight (lb)',
        type: 'number',
        min: 80,
        step: 1,
        required: true,
        helperText: 'Your most recent morning weight for consistency.'
      },
      {
        id: 'goalWeight',
        label: 'Goal Weight (lb)',
        type: 'number',
        min: 80,
        step: 1,
        required: true,
        helperText: 'A realistic target based on your care plan.'
      },
      {
        id: 'heightInches',
        label: 'Height (inches)',
        type: 'number',
        min: 48,
        step: 1,
        required: true,
        helperText: 'Used for context and body-composition framing.'
      }
    ]
  },
  {
    title: 'Clinical Context',
    description: 'Health factors that influence expected trajectory.',
    fields: [
      {
        id: 'age',
        label: 'Age',
        type: 'number',
        min: 18,
        max: 90,
        step: 1,
        required: true,
        helperText: 'Adult treatment model only.'
      },
      {
        id: 'insulinResistance',
        label: 'Insulin Resistance Profile',
        type: 'select',
        options: ['Low', 'Moderate', 'High'],
        required: true,
        helperText: 'Select the category that best fits your labs and diagnosis.'
      },
      {
        id: 'metabolicCondition',
        label: 'Metabolic Condition',
        type: 'select',
        options: ['None', 'Prediabetes', 'Type 2 Diabetes', 'PCOS'],
        required: true,
        helperText: 'Used as a conservative adjustment in placeholder model.'
      }
    ]
  },
  {
    title: 'Lifestyle Inputs',
    description: 'Behavior and support habits to improve adherence.',
    fields: [
      {
        id: 'activityLevel',
        label: 'Weekly Activity Level',
        type: 'select',
        options: ['Minimal', 'Light', 'Moderate', 'High'],
        required: true,
        helperText: 'Estimate your average structured movement per week.'
      },
      {
        id: 'proteinCompliance',
        label: 'Protein/Meal Compliance (%)',
        type: 'number',
        min: 0,
        max: 100,
        step: 5,
        required: true,
        helperText: 'How often you follow your nutrition targets.'
      },
      {
        id: 'sleepHours',
        label: 'Average Sleep (hours/night)',
        type: 'number',
        min: 4,
        max: 10,
        step: 0.5,
        required: true,
        helperText: 'Recovery influences treatment consistency.'
      }
    ]
  },
  {
    title: 'Medication Selection',
    description: 'Choose treatment pathway for projections and cost comparison.',
    fields: [
      {
        id: 'medication',
        label: 'Preferred Medication Path',
        type: 'select',
        options: ['Semaglutide', 'Tirzepatide'],
        required: true,
        helperText: 'You can compare both options on the comparison page.'
      },
      {
        id: 'monthlyBudget',
        label: 'Monthly Budget ($)',
        type: 'number',
        min: 100,
        step: 25,
        required: true,
        helperText: 'Guides value and pacing recommendations.'
      }
    ]
  }
];

export const initialFormValues = calculatorSections.reduce((acc, section) => {
  section.fields.forEach((field) => {
    acc[field.id] = '';
  });
  return acc;
}, {});
