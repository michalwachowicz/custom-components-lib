export type EntityType = {
    id: number;
    x: number;
    y: number;
};
export default function Entity({ className, size, entity, }: {
    className?: string;
    size: number;
    entity: EntityType;
}): import("react/jsx-runtime").JSX.Element;
