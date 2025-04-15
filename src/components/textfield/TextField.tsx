import { useId, useState } from "react";
import * as styles from "./TextField.module.scss";
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

  const focusedClass = focused ? styles["textfield-focused"] : "";
  const notEmptyClass = value !== "" ? styles["textfield-not-empty"] : "";
  const errorClass = error ? styles["textfield-error"] : "";

  return (
    <div
      className={`${styles[`textfield-container-${variant}`]}`}
      data-testid='textfield-container'
    >
      <div
        data-testid='textfield'
        className={`${styles.textfield} ${
          styles[`textfield-${variant}`]
        } ${focusedClass} ${notEmptyClass} ${errorClass}`}
      >
        <label className={styles["textfield-label"]} htmlFor={id}>
          {label}
        </label>

        <div className={styles["textfield-input-wrapper"]}>
          <input
            className={styles["textfield-input"]}
            type='text'
            id={id}
            disabled={disabled}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {variant === "outlined" && (focused || value !== "") && (
          <fieldset
            className={styles["textfield-fieldset"]}
            data-testid='textfield-fieldset'
          >
            <legend className={styles["textfield-fieldset-legend"]}>
              {label}
            </legend>
          </fieldset>
        )}
      </div>

      {typeof error === "string" && error.trim() !== "" && (
        <div className={styles["textfield-error-message"]}>{error}</div>
      )}
    </div>
  );
}
