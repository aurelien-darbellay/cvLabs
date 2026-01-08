import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AssetItem from "./AssetItem";

interface DraggableAssetItemProps {
  asset: AssetItem;
  onToggle: (asset: AssetItem) => void;
  isUpdating: boolean;
}

export function DraggableAssetItem({
  asset,
  onToggle,
  isUpdating,
}: DraggableAssetItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: JSON.stringify({ type: asset.type, id: asset.id }) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        style={{
          backgroundColor: isDragging ? "#f3f4f6" : undefined,
        }}
      >
        <div
          className="mr-3 text-gray-400 cursor-grab active:cursor-grabbing select-none"
          {...listeners}
        >
          ≡
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{asset.title}</p>
          {asset.subtitle && (
            <p className="text-sm text-gray-500">{asset.subtitle}</p>
          )}
        </div>
        <button
          onClick={() => {
            onToggle(asset);
          }}
          disabled={isUpdating}
          className="px-4 py-2 rounded-lg font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? "..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
