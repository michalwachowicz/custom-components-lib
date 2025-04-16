import { RefObject } from "react";
import { EntityType } from "../components/clickEntity/ClickEntity";
export default function useClickEntity<T extends HTMLElement>(ref: RefObject<T | null>): {
    entity: EntityType | null;
    size: number;
    spawnEntity: (x: number, y: number) => void;
};
