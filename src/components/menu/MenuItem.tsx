import * as styles from "./Menu.module.scss";

interface MenuItemProps {
  active: boolean;
  value: string;
  children: string;
  onUpdate?: (value: string) => void;
}

export default function MenuItem({
  active,
  value,
  children,
  onUpdate,
}: MenuItemProps) {
  const handleClick = () => {
    if (onUpdate) onUpdate(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <li
      className={`${styles["menu-item"]} ${
        active ? styles["menu-item-active"] : ""
      }`}
      role='option'
      value={value}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
    </li>
  );
}
