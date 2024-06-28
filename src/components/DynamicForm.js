import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { submitForm } from '../services/api';

function DynamicForm({ packageId, formDefinition }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value, type, required, validation) => {
    let error = '';

    if (required && !value) {
      error = `${name} is required`;
    }

    if (type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        error = 'Invalid email address';
      }
    }

    if (validation && validation.regex && value) {
      const regex = new RegExp(validation.regex);
      if (!regex.test(value)) {
        error = validation.message || 'Invalid format';
      }
    }

    return error;
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    let newValue = value;

    if (type === 'checkbox') {
      newValue = formData[name] || [];
      if (checked) {
        newValue.push(value);
      } else {
        newValue = newValue.filter(val => val !== value);
      }
    } else if (type === 'file') {
      newValue = files;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

    const field = formDefinition.fields.find(f => f.name === name);
    const error = validateField(name, newValue, type, field.required, field.validation);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    formDefinition.fields.forEach(field => {
      const error = validateField(field.name, formData[field.name], field.type, field.required, field.validation);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          formDataToSubmit.append(key, formData[key]);
        }
      }
      await submitForm(packageId, formDataToSubmit);
      alert('Form submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formDefinition.fields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === 'text' || field.type === 'email' ? (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          ) : field.type === 'radio' ? (
            field.options.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))
          ) : field.type === 'checkbox' ? (
            field.options.map(option => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name]?.includes(option.value) || false}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))
          ) : field.type === 'dropdown' ? (
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            >
              <option value="">Select {field.label}</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'date' ? (
            <input
              type="date"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          ) : field.type === 'file' ? (
            <input
              type="file"
              name={field.name}
              onChange={handleChange}
            />
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              maxLength={field.maxLength}
            />
          ) : null}
          {errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

DynamicForm.propTypes = {
  packageId: PropTypes.number.isRequired,
  formDefinition: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool,
        validation: PropTypes.shape({
          regex: PropTypes.string,
          message: PropTypes.string
        }),
        options: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
          })
        ),
        maxLength: PropTypes.number
      })
    ).isRequired,
  }).isRequired,
};

export default DynamicForm;
