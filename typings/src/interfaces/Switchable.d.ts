import { RefObject } from "react";
export default interface Switchable<T extends HTMLElement = HTMLInputElement> {
    ref?: RefObject<T | null>;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (state: boolean) => void;
}
