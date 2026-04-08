import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatorSections, initialFormValues } from '../config/calculatorConfig';
import { calculateRoadmap } from '../utils/calculations';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import InputField from './InputField';

function validate(values) {
  const nextErrors = {};
  calculatorSections.forEach((section) => {
    section.fields.forEach((field) => {
      const rawValue = values[field.id];
      if (field.required && (rawValue === '' || rawValue === null || rawValue === undefined)) {
        nextErrors[field.id] = 'This field is required.';
        return;
      }
      if (field.type === 'number' && rawValue !== '') {
        const numeric = Number(rawValue);
        if (Number.isNaN(numeric)) nextErrors[field.id] = 'Enter a valid number.';
        if (field.min !== undefined && numeric < field.min) nextErrors[field.id] = `Minimum is ${field.min}.`;
        if (field.max !== undefined && numeric > field.max) nextErrors[field.id] = `Maximum is ${field.max}.`;
      }
    });
  });

  if (Number(values.goalWeight) >= Number(values.currentWeight)) {
    nextErrors.goalWeight = 'Goal weight must be less than current weight.';
  }

  return nextErrors;
}

function CalculatorForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(() => loadFromStorage(STORAGE_KEYS.form, initialFormValues));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.form, formValues);
  }, [formValues]);

  const completion = useMemo(() => {
    const total = Object.keys(initialFormValues).length;
    const filled = Object.values(formValues).filter((value) => value !== '').length;
    return Math.round((filled / total) * 100);
  }, [formValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(formValues);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const result = calculateRoadmap(formValues);
    saveToStorage(STORAGE_KEYS.result, result);
    navigate('/dashboard');
  };

  return (
    <form className="calculator-form" onSubmit={handleSubmit}>
      <div className="form-topline">
        <h1>Roadmap Calculator</h1>
        <p>Complete all sections to generate your projection dashboard and medication comparison insights.</p>
        <div className="progress-pill">
          <span>Form completion</span>
          <strong>{completion}%</strong>
        </div>
      </div>

      {calculatorSections.map((section) => (
        <fieldset key={section.title} className="section-card form-section">
          <legend>{section.title}</legend>
          <p>{section.description}</p>
          <div className="field-grid">
            {section.fields.map((field) => (
              <InputField
                key={field.id}
                field={field}
                value={formValues[field.id]}
                onChange={handleChange}
                error={errors[field.id]}
              />
            ))}
          </div>
        </fieldset>
      ))}

      <button className="btn btn-primary" type="submit">
        Calculate My Roadmap
      </button>
    </form>
  );
}

export default CalculatorForm;
