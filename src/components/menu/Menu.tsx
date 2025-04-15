import { RefObject } from "react";
import * as styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

interface MenuProps {
  ref: RefObject<HTMLUListElement | null>;
  id: string;
  currentValue: string;
  options: { value: string; content: string }[];
  onSelect: (value: string, display: string) => void;
}

export default function Menu({
  ref,
  id,
  currentValue,
  options,
  onSelect,
}: MenuProps) {
  return (
    <ul ref={ref} id={id} role='listbox' className={styles["menu"]}>
      {options.map(({ value, content }) => (
        <MenuItem
          key={value}
          active={value === currentValue}
          value={value}
          onUpdate={() => onSelect(value, content)}
        >
          {content}
        </MenuItem>
      ))}
    </ul>
  );
}
