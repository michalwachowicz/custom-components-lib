import {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import * as styles from "./Button.module.scss";

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

interface Entity {
  id: number;
  x: number;
  y: number;
}

function ButtonEntity({ size, entity }: { size: number; entity: Entity }) {
  const { x, y } = entity;
  const sizePx = `${size}px`;

  return (
    <span
      data-testid='btn-entity'
      className={styles["btn-entity"]}
      style={{
        height: sizePx,
        width: sizePx,
        top: `${y}px`,
        left: `${x}px`,
      }}
    />
  );
}

export default function Button({
  variant = "contained",
  disabled = false,
  size,
  children,
  ref,
  onClick = () => {},
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const finalRef = ref || btnRef;

  const [entity, setEntity] = useState<Entity | null>(null);
  const [height, setHeight] = useState(0);

  const spawnEntity = (x: number, y: number) => {
    setEntity({ id: Math.random(), x, y });
  };

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);

    spawnEntity(e.clientX, e.clientY);
  };

  useLayoutEffect(() => {
    setHeight(finalRef.current?.offsetHeight || 0);
  }, [finalRef]);

  useEffect(() => {
    if (entity !== null) {
      const timer = setTimeout(() => setEntity(null), 500);
      return () => clearTimeout(timer);
    }
  }, [entity]);

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
          <ButtonEntity key={entity.id} size={height} entity={entity} />
        )}
      </span>
    </button>
  );
}
