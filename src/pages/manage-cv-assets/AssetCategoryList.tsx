import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AssetType } from "@/types/assets";
import AssetItem from "./AssetItem";
import { DraggableAssetItem } from "./DraggableAssetItem";

interface AssetCategoryListProps {
  category: AssetType;
  categoryLabel: string;
  inCvAssets: AssetItem[];
  outOfCvAssets: AssetItem[];
  updating: number | null;
  onToggle: (asset: AssetItem) => void;
}

export function AssetCategoryList({
  category,
  categoryLabel,
  inCvAssets,
  outOfCvAssets,
  updating,
  onToggle,
}: AssetCategoryListProps) {
  const sortableIds = inCvAssets.map((a) =>
    JSON.stringify({ type: a.type, id: a.id })
  );

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
        {categoryLabel}
      </h2>

      {/* Draggable in-CV assets */}
      {inCvAssets.length > 0 && (
        <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 mb-4">
            {inCvAssets.map((asset) => (
              <DraggableAssetItem
                key={`${asset.type}-${asset.id}`}
                asset={asset}
                onToggle={onToggle}
                isUpdating={updating === asset.id}
              />
            ))}
          </div>
        </SortableContext>
      )}

      {/* Non-CV assets (Add buttons) */}
      {outOfCvAssets.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">Available to add:</p>
          <div className="space-y-2">
            {outOfCvAssets.map((asset) => (
              <div
                key={`${asset.type}-${asset.id}`}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{asset.title}</p>
                  {asset.subtitle && (
                    <p className="text-sm text-gray-500">{asset.subtitle}</p>
                  )}
                </div>
                <button
                  onClick={() => onToggle(asset)}
                  disabled={updating === asset.id}
                  className="px-4 py-2 rounded-lg font-medium transition-colors bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating === asset.id ? "..." : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {inCvAssets.length === 0 && outOfCvAssets.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          No {categoryLabel.toLowerCase()} available
        </p>
      )}
    </div>
  );
}
