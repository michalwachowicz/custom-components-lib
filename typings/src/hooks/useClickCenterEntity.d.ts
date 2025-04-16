import { RefObject } from "react";
export default function useClickCenterEntity<T extends HTMLElement>(ref: RefObject<T | null>): {
    entity: import("../components/clickEntity/ClickEntity").EntityType | null;
    size: number;
    spawnEntity: () => void;
};
