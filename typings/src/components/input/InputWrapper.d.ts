import type { InputVariant } from "../../types/InputVariant";
interface InputWrapperProps {
    focused: boolean;
    value: string;
    error: boolean | string;
    label: string;
    labelElement: React.ReactNode;
    inputElement: React.ReactNode;
    variant?: InputVariant;
}
export default function InputWrapper({ focused, value, error, label, labelElement, inputElement, variant, }: InputWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
