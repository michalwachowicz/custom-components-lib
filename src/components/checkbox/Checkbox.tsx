import { RefObject, useId, useRef } from "react";
import * as styles from "./Checkbox.module.scss";
import useClickEntity from "../clickEntity/useClickEntity";
import Entity from "../clickEntity/ClickEntity";

interface CheckboxProps {
  ref?: RefObject<HTMLInputElement | null>;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (state: boolean) => void;
}

export default function Checkbox({
  ref,
  label = undefined,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const finalRef = ref || inputRef;

  const { entity, size, spawnEntity } = useClickEntity({ ref: finalRef });

  const changeHandler = () => {
    if (onChange) onChange(!checked);

    const rect = finalRef.current?.getBoundingClientRect();
    spawnEntity((rect?.width || 0) / 2, (rect?.height || 0) / 2);
  };

  return (
    <div className={styles["checkbox-container"]}>
      <div className={styles["checkbox-wrapper"]}>
        <input
          ref={finalRef}
          className={styles["checkbox-input"]}
          id={id}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          onChange={changeHandler}
        />

        {entity !== null && (
          <Entity key={entity.id} size={size} entity={entity} />
        )}
      </div>

      {label && (
        <label htmlFor={id} className={styles["checkbox-label"]}>
          {label}
        </label>
      )}
    </div>
  );
}
