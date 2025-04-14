import { RefObject } from "react";
import useClickEntity from "./useClickEntity";

export default function useClickCenterEntity<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const { entity, size, spawnEntity } = useClickEntity({ ref });

  const handleSpawnEntity = () => {
    spawnEntity(size / 2, size / 2);
  };

  return { entity, size, spawnEntity: handleSpawnEntity };
}
