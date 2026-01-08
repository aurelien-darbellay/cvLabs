import { AssetType } from "@/types/assets";
import { assetServiceRegistry } from "@/services/assets/serviceRegistry";
import { PositionCvRelationService } from "@/services/base/PositionCvRelationService";
import { log } from "@/utils/Log";
import AssetItem from "./AssetItem";

export async function handleUpdatePositions(
  type: AssetType,
  assets: AssetItem[]
) {
  const service = assetServiceRegistry[type].relationService;
  if (!service || !(service instanceof PositionCvRelationService)) {
    throw new Error("No relation service found for this asset type");
  }

  // Filter only in-CV assets of this type
  const inCvAssets = assets.filter((a) => a.type === type && a.isInCv);
  if (inCvAssets.length === 0) {
    log("No in-CV assets to update for type:", type);
    return;
  }

  log("Updating positions for type:", type, "assets:", inCvAssets);

  // Build payload from current state (positions already set by drag-and-drop)
  const payload = inCvAssets
    .map((a) => ({
      relation_id: (a as any).relationId ?? 0,
      position: a.position ?? 0,
    }))
    .filter((a) => a.relation_id > 0 && a.position > 0);

  if (payload.length === 0) {
    log("No valid payload to persist");
    return;
  }

  log("Persisting positions to DB:", payload);
  await service.updatePositions(payload);
}
