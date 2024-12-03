/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Form = ({ fields, initialValues, onFormChange, onSubmit, resetAfterSubmit, rowsConfig }) => {
  const [formValues, setFormValues] = useState(() => {
    const defaultValues = fields.reduce((acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.name] = field.defaultValue;
      }
      return acc;
    }, {});
    return { ...defaultValues, ...initialValues };
  });

  useEffect(() => {
    if (initialValues) {
      const updatedValues = { ...formValues, ...initialValues };
      setFormValues(updatedValues); // Sync with initial values
    }
  }, [initialValues]);

  const handleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    if (onFormChange) onFormChange(updatedValues); // Notify parent of changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues); // Submit all form data
    if (resetAfterSubmit) setFormValues({}); // Reset form after submit
  };

  const responsiveStyles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    row: { display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
    field: {
      flex: '1 1 calc(33.333% - 15px)',
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxSizing: 'border-box'
    },
    label: { fontWeight: 'bold', fontSize: '14px', textAlign: 'left' },
    input: { padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    button: {
      padding: '15px',
      marginTop: '15px',
      width: '100%',
      backgroundColor: '#5b2c6f',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  };

  const groupFieldsByRows = (fields, rowsConfig) => {
    const groupedRows = [];
    let index = 0;

    rowsConfig.forEach((rowSize) => {
      const row = fields.slice(index, index + rowSize);
      groupedRows.push(row);
      index += rowSize;
    });

    if (index < fields.length) {
      groupedRows.push(fields.slice(index));
    }

    return groupedRows;
  };

  const groupedFields = groupFieldsByRows(fields, rowsConfig || [fields.length]);

  return (
    <form onSubmit={handleSubmit} style={responsiveStyles.form}>
      {groupedFields.map((rowFields, rowIndex) => (
        <div key={rowIndex} style={responsiveStyles.row}>
          {rowFields.map((field, fieldIndex) => (
            <div key={fieldIndex} style={responsiveStyles.field}>
              <label style={responsiveStyles.label}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  style={responsiveStyles.input}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  placeholder={field.placeholder}
                  readOnly={field.readOnly || false}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  style={responsiveStyles.input}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="submit" style={responsiveStyles.button}>
        Submit
      </button>
    </form>
  );
};

export default Form;
