import { MouseEventHandler } from "react";
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
export default function Button({ variant, disabled, size, children, ref, onClick, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
