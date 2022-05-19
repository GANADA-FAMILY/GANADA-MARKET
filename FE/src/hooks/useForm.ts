import React, { useState, useEffect } from 'react';

interface useFormProps {
  initalState: any;
  onSubmit: () => void;
  validate: (form: any) => boolean;
}
export default function useForm({
  initalState,
  onSubmit,
  validate,
}: useFormProps) {
  const [values, setState] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setErrors(validate(values));
    setIsLoading(true);
    // event.preventDefault();
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
