interface ModalProps {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode | string;
}
export default function Modal({ open, onClose, children }: ModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
