import type { InputVariant } from "../../types/InputVariant";
interface TextFieldProps {
    label: string;
    variant?: InputVariant;
    disabled?: boolean;
    error?: boolean | string;
}
export default function TextField({ label, variant, disabled, error, }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
