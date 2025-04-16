import { RefObject, useRef } from "react";

export default function useFinalRef<T extends HTMLElement>(
  ref: RefObject<T | null> | undefined
) {
  const innerRef = useRef<T>(null);
  const finalRef = ref || innerRef;

  return finalRef;
}
