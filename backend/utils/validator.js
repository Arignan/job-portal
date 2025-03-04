//Custom data validators

exports.validateJobInput = (data) => {
    let errors = {};
    if (!data.jobTitle || data.jobTitle.trim() === '') {
      errors.jobTitle = 'Job title is required';
    }
    // Additional validations can be added here
    return { errors, isValid: Object.keys(errors).length === 0 };
};
  