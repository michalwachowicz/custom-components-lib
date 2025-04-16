interface MenuItemProps {
    active: boolean;
    value: string;
    children: string;
    onUpdate?: (value: string) => void;
}
export default function MenuItem({ active, value, children, onUpdate, }: MenuItemProps): import("react/jsx-runtime").JSX.Element;
export {};
