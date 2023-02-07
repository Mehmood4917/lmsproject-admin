import { useState } from 'react';
let isSubmitted = false;
let newErrors = {};
let hasErrors = false;
export const useFormValidation = metadata => {
  const [data, setData] = useState(metadata.initialValues || {});
  const [errors, setErrors] = useState({});
  const handleChange = name => (e) => {
    e.preventDefault();
    if (name) {
      setData({
        ...data,
        [name]: e.target.value
      });
      if (isSubmitted) {
        validateFormControl(name, e.target.value);
        if (errors && errors[name] && !newErrors[name]) {
          setErrors({
            ...errors,
            [name]: ''
          });
        } else {
          setErrors({
            ...errors,
            ...newErrors
          });
        }
        newErrors = {};
      }
    }
  };
  const setValues = v => {
    // console.log(v)
    setData(v);
  }
  const handleSubmit = e => {
    e.preventDefault();
    isSubmitted = true;
    validateForm();  
    if(!hasErrors) {
      metadata.submit()
    }
  };
  const validateForm = () => {
    for (const key in metadata.validationSchema) {
      validateFormControl(key, data[key]);
    }
    setErrors(newErrors);
    var size=Object.keys(newErrors).length;
    if(size){
      hasErrors = true
    }else {
      hasErrors = false
    }
    newErrors = {};
  };
  const validateFormControl = (key, value) => {
    const schema = metadata.validationSchema;
    const validationFormControl = schema[key];
    if (validationFormControl?.required && !value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl.required.message
      };
    } else if (
      validationFormControl?.minlength &&
      value.length < validationFormControl.minlength.value
    ) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl.minlength.message
      };
    } else if (
      validationFormControl?.pattern &&
      !validationFormControl.pattern.value.test(value)
    ) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl.pattern.message
      };
    }
  };
  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    setValues
  };
};