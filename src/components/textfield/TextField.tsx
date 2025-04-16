import { useId, useState } from "react";
import InputWrapper from "../input/InputWrapper";
import type { InputVariant } from "../../types/InputVariant";

interface TextFieldProps {
  label: string;
  variant?: InputVariant;
  disabled?: boolean;
  error?: boolean | string;
}

export default function TextField({
  label,
  variant = "standard",
  disabled = false,
  error = false,
}: TextFieldProps) {
  const id = useId();

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      variant={variant}
      focused={focused}
      value={value}
      error={error}
      label={label}
      labelElement={<label htmlFor={id}>{label}</label>}
      inputElement={
        <input
          id={id}
          type='text'
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      }
    />
  );
}
