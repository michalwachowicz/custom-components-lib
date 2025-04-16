import type { InputVariant } from "../../types/InputVariant";
interface SelectProps {
    label: string;
    variant?: InputVariant;
    disabled?: boolean;
    error?: boolean | string;
    options: {
        value: string;
        content: string;
    }[];
}
export default function Select({ label, variant, disabled, error, options, }: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
