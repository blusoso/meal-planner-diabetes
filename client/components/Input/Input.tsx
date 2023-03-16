import React, { ChangeEvent } from "react";

export enum INPUT_TYPE {
  TEXT = "text",
  NUMBER = "number",
  TEXTAREA = "textarea",
  EMAIL = "email",
  PASSWORD = "password",
}

type InputProps = {
  label?: string;
  name: string;
  type: INPUT_TYPE;
  placeholder?: string;
  value?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Input = ({
  label = "",
  name,
  type,
  placeholder,
  value,
  min,
  max,
  step,
  disabled,
  autoFocus,
  onFocus,
  onBlur,
  onChange,
}: InputProps) => {
  return (
    <label>
      {label && label}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
