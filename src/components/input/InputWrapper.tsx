import * as styles from "./InputWrapper.module.scss";
import type { InputVariant } from "../../types/InputVariant";

interface InputWrapperProps {
  focused: boolean;
  value: string;
  error: boolean | string;
  label: string;
  labelElement: React.ReactNode;
  inputElement: React.ReactNode;
  variant?: InputVariant;
}

export default function InputWrapper({
  focused,
  value,
  error,
  label,
  labelElement,
  inputElement,
  variant,
}: InputWrapperProps) {
  const focusedClass = focused ? styles["input-focused"] : "";
  const notEmptyClass = value !== "" ? styles["input-not-empty"] : "";
  const errorClass = error ? styles["input-error"] : "";

  return (
    <div
      className={`${styles[`input-container-${variant}`]}`}
      data-testid='input-container'
    >
      <div
        data-testid='input'
        className={`${styles.input} ${
          styles[`input-${variant}`]
        } ${focusedClass} ${notEmptyClass} ${errorClass}`}
      >
        <div data-wrapper-label='true'>{labelElement}</div>
        <div className={styles["input-wrapper"]}>{inputElement}</div>

        {variant === "outlined" && (focused || value !== "") && (
          <fieldset
            className={styles["input-fieldset"]}
            data-testid='input-fieldset'
          >
            <legend className={styles["input-fieldset-legend"]}>{label}</legend>
          </fieldset>
        )}
      </div>

      {typeof error === "string" && error.trim() !== "" && (
        <div className={styles["input-error-message"]}>{error}</div>
      )}
    </div>
  );
}
