import { useEffect, useId, useRef, useState } from "react";
import * as styles from "./Select.module.scss";
import InputWrapper from "../input/InputWrapper";
import type { InputVariant } from "../../types/InputVariant";
import Menu from "../menu/Menu";

interface SelectProps {
  label: string;
  variant?: InputVariant;
  disabled?: boolean;
  error?: boolean | string;
  options: { value: string; content: string }[];
}

export default function Select({
  label,
  variant = "standard",
  disabled = false,
  error = false,
  options,
}: SelectProps) {
  const id = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState({ value: "", display: "" });

  const handleSelect = (value: string, display: string) => {
    setValue({ value, display });
    setOpen(false);
    setFocused(true);
  };

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !btnRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <InputWrapper
      variant={variant}
      focused={focused}
      value={value.value}
      error={error}
      label={label}
      labelElement={<>{label}</>}
      inputElement={
        <>
          <button
            ref={btnRef}
            className={`${styles["select-btn"]} ${
              disabled ? styles["select-btn-disabled"] : ""
            }`}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-haspopup='listbox'
            aria-controls={id}
          >
            {value.display}
          </button>

          {open && (
            <Menu
              ref={menuRef}
              id={id}
              currentValue={value.value}
              options={options}
              onSelect={handleSelect}
            />
          )}
        </>
      }
    />
  );
}
