import { MouseEventHandler } from "react";
import * as styles from "./Button.module.scss";
import useClickEntity from "../../hooks/useClickEntity";
import Entity from "../clickEntity/ClickEntity";
import useFinalRef from "../../hooks/useFinalRef";

export type ButtonVariant = "text" | "contained" | "outlined";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLButtonElement | null>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  variant = "contained",
  disabled = false,
  size,
  children,
  ref,
  onClick = () => {},
}: ButtonProps) {
  const finalRef = useFinalRef(ref);

  const { entity, size: s, spawnEntity } = useClickEntity(finalRef);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);

    const { offsetX, offsetY } = e.nativeEvent;
    spawnEntity(offsetX, offsetY);
  };

  return (
    <button
      ref={finalRef}
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${
        styles[`btn-${size}`]
      }`}
      type='button'
      disabled={disabled}
      onClick={clickHandler}
    >
      {children}
      <span className={styles["btn-backdrop"]}>
        {entity !== null && (
          <Entity
            key={entity.id}
            className={styles["btn-entity"]}
            size={s}
            entity={entity}
          />
        )}
      </span>
    </button>
  );
}
