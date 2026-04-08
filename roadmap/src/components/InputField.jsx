function InputField({ field, value, onChange, error }) {
  const inputProps = {
    id: field.id,
    name: field.id,
    onChange,
    value,
    min: field.min,
    max: field.max,
    step: field.step,
    required: field.required
  };

  return (
    <label className="input-shell" htmlFor={field.id}>
      <span className="label-row">
        {field.label}
        {field.required && <em>Required</em>}
      </span>
      {field.type === 'select' ? (
        <select {...inputProps}>
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={field.type} {...inputProps} />
      )}
      {field.helperText && <small>{field.helperText}</small>}
      {error && <span className="error-text">{error}</span>}
    </label>
  );
}

export default InputField;
