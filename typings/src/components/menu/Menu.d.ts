import { RefObject } from "react";
interface MenuProps {
    ref: RefObject<HTMLUListElement | null>;
    id: string;
    currentValue: string;
    options: {
        value: string;
        content: string;
    }[];
    onSelect: (value: string, display: string) => void;
}
export default function Menu({ ref, id, currentValue, options, onSelect, }: MenuProps): import("react/jsx-runtime").JSX.Element;
export {};
