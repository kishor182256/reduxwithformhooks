import React, { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}

const Input: FC<InputProps> = ({
  label,
  name,
  register,
  required = false,
  type ,
  defaultValue = '',
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        {...register(name, { required })}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
