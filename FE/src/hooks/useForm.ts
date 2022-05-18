import React, { useState, useEffect, useCallback } from 'react';

interface useFormProps<T> {
  initalState: any;
  onSubmit: () => void;
  validate: (form: any) => boolean;
}
function useForm<T>({ initalState, onSubmit, validate }: useFormProps<T>) {
  const [values, setState] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setErrors(validate(values));
  };
  const onChangeLoading = async () => {
    if (isLoading) {
      if (Object.keys(errors).length === 0 && onSubmit) {
        await onSubmit();
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    onChangeLoading();
  }, [errors, isLoading]);

  return [values, errors, isLoading, handleChange, handleSubmit];
}
export default useForm;
