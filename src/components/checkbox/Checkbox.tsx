import { useId } from "react";
import * as styles from "./Checkbox.module.scss";
import useClickEntity from "../clickEntity/useClickEntity";
import Entity from "../clickEntity/ClickEntity";
import Switchable from "../../interfaces/Switchable";
import useFinalRef from "../../hooks/useFinalRef";

export default function Checkbox({
  ref,
  label = undefined,
  checked = false,
  disabled = false,
  onChange,
}: Switchable) {
  const id = useId();
  const finalRef = useFinalRef(ref);

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
