import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { EntityType } from "./ClickEntity";

interface EntityHookProps {
  ref: RefObject<HTMLElement | null>;
}

export default function useClickEntity({ ref }: EntityHookProps) {
  const [entity, setEntity] = useState<EntityType | null>(null);
  const [size, setSize] = useState(0);

  const spawnEntity = (x: number, y: number) => {
    setEntity({ id: Math.random(), x, y });
  };

  useLayoutEffect(() => {
    setSize(ref.current?.offsetHeight || 0);
  }, [ref]);

  useEffect(() => {
    if (entity !== null) {
      const timer = setTimeout(() => setEntity(null), 500);
      return () => clearTimeout(timer);
    }
  }, [entity]);

  return { entity, size, spawnEntity };
}
