import { AssetType } from "@/types/assets";
import AssetItem from "./AssetItem";

export function inferPositionFromArrayIndex(
  reorderedAssets: AssetItem[],
  type: AssetType,
  allAssets: AssetItem[]
): AssetItem[] {
  // Create a map of new positions
  const positionMap = new Map<number, number>();
  reorderedAssets.forEach((item, index) => {
    positionMap.set(item.id, index + 1);
  });
  // Update all assets with new positions where applicable
  return allAssets.map((asset) => {
    if (asset.type === type && positionMap.has(asset.id)) {
      return { ...asset, position: positionMap.get(asset.id)! };
    }
    return asset;
  });
}
