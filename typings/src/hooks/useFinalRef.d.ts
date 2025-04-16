import { RefObject } from "react";
export default function useFinalRef<T extends HTMLElement>(ref: RefObject<T | null> | undefined): RefObject<T | null>;
