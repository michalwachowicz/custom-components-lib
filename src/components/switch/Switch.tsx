import { useId, useRef } from "react";
import * as styles from "./Switch.module.scss";
import Switchable from "../../interfaces/Switchable";
import useClickCenterEntity from "../../hooks/useClickCenterEntity";
import Entity from "../clickEntity/ClickEntity";

export default function Switch({
  ref,
  label = undefined,
  checked = false,
  disabled = false,
  onChange,
}: Switchable) {
  const id = useId();
  const handleRef = useRef<HTMLDivElement>(null);
  const { entity, size, spawnEntity } = useClickCenterEntity(handleRef);

  const handleChange = () => {
    if (disabled) return;
    if (onChange) onChange(!checked);

    spawnEntity();
  };

  const checkedClass = checked ? styles["switch-checked"] : "";
  const disabledClass = disabled ? styles["switch-disabled"] : "";

  return (
    <div className={styles["switch-container"]}>
      <input
        ref={ref}
        id={id}
        className={styles["switch-checkbox"]}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />

      <div
        data-testid='switch'
        aria-hidden='true'
        className={`${styles.switch} ${checkedClass} ${disabledClass}`}
        onClick={handleChange}
      >
        <div className={styles["switch-back"]}></div>
        <div ref={handleRef} className={styles["switch-handle"]}>
          <div className={styles["switch-handle-inner"]} />

          {entity !== null && (
            <Entity key={entity.id} size={size} entity={entity} />
          )}
        </div>
      </div>

      {label && (
        <label className={styles["switch-label"]} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
