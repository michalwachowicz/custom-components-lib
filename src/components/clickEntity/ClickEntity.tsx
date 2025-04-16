import * as styles from "./ClickEntity.module.scss";

export type EntityType = {
  id: number;
  x: number;
  y: number;
};

export default function Entity({
  className,
  size,
  entity,
}: {
  className?: string;
  size: number;
  entity: EntityType;
}) {
  const { x, y } = entity;
  const sizePx = `${size}px`;

  return (
    <span
      data-testid='entity'
      className={`${styles["entity"]} ${className}`}
      style={{
        height: sizePx,
        width: sizePx,
        top: `${y}px`,
        left: `${x}px`,
      }}
    />
  );
}
