import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useCvs } from "@/hooks/useCvs";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { supabase } from "@/lib/supabaseClient";
import { AssetType } from "@/types/assets";
import tableMap from "@/types/relationTables";
import AssetItem from "@/pages/manage-cv-assets/AssetItem";
import useCvAssets from "./manage-cv-assets/useCvAssets";
import { assetServiceRegistry } from "@/services/assets/serviceRegistry";
import { PositionCvRelationService } from "@/services/base/PositionCvRelationService";
import normalizeValues from "@/utils/normalizeValues";
import { error, log } from "@/utils/Log";
import { sortGroupedAsset } from "./manage-cv-assets/sortGroupedAsset";
import { handleUpdatePositions } from "./manage-cv-assets/handleUpdatePositions";
import { AssetCategoryList } from "./manage-cv-assets/AssetCategoryList";
import { inferPositionFromArrayIndex } from "./manage-cv-assets/inferPositionFromArrayIndex";
import { arrayMove } from "@dnd-kit/sortable";

export default function ManageCvAssetsPage() {
  const { cvId } = useParams<{ cvId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const userId = user?.id;

  const { cvs, loading: loadingCvs } = useCvs([userId]);

  // Get asset data from location state
  const {
    education,
    experience,
    languageSkills,
    softSkills,
    techSkills,
    summaries,
    professions,
  } = location.state;

  const [updating, setUpdating] = useState<number | null>(null);
  const [groupedAssets, setGroupedAssets] = useState<
    Record<AssetType, AssetItem[]>
  >({} as Record<AssetType, AssetItem[]>);
  const { assets, setAssets, loading } = useCvAssets(cvId, userId, {
    education,
    experience,
    languageSkills,
    softSkills,
    techSkills,
    summaries,
    professions,
  });
  const currentCv = cvs.find((cv) => cv.id === Number(cvId));

  // Group assets by category
  useEffect(() => {
    const tempGroupedAssets = assets.reduce((acc, asset) => {
      if (!acc[asset.type]) {
        acc[asset.type] = [];
      }
      acc[asset.type].push(asset);
      return acc;
    }, {} as Record<AssetType, AssetItem[]>);

    for (let category in tempGroupedAssets) {
      tempGroupedAssets[category as AssetType].sort(sortGroupedAsset);
    }
    setGroupedAssets(tempGroupedAssets);
  }, [assets]);

  const toggleAssetInCv = async (asset: AssetItem) => {
    if (!cvId || !userId) {
      throw new Error("CV ID or User ID is missing");
    }
    setUpdating(asset.id);
    const { relationService: service, positionned } =
      assetServiceRegistry[asset.type];
    if (!service) {
      throw new Error("No relation service found for this asset type");
    }
    try {
      const cvIdNum = Number(cvId);
      const { table, field } = tableMap[asset.type];
      if (asset.isInCv) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("cv_id", cvIdNum)
          .eq(field, asset.id);

        if (error) throw error;

        setAssets((prev) =>
          prev.map((a) =>
            a.id === asset.id && a.type === asset.type
              ? { ...a, isInCv: false }
              : a
          )
        );
      } else {
        const payload: any = {
          cvId: cvIdNum,
          domainId: asset.id,
          visible: true,
        };
        if (positionned) {
          const maxPosition = await (
            service as PositionCvRelationService<any, any>
          ).getLastPosition(cvIdNum);
          payload["position"] = maxPosition + 1;
        }
        const normalizedPayload = normalizeValues(payload);
        const { error: err } = await service.addAssetToCv(normalizedPayload);
        if (err) throw err;
        setAssets((prev) =>
          prev.map((a) =>
            a.id === asset.id && a.type === asset.type
              ? { ...a, isInCv: true }
              : a
          )
        );
      }
    } catch (err) {
      error("Error toggling asset in CV:", err);
      alert("Failed to update CV. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    try {
      // Extract category and asset IDs from drag IDs (JSON format)
      const activeData = JSON.parse(String(active.id));
      const overData = JSON.parse(String(over.id));

      const activeAssetId = activeData.id;
      const overAssetId = overData.id;
      const category = activeData.type as AssetType;

      const activeItem = assets.find(
        (a) => a.id === activeAssetId && a.type === category
      );
      const overItem = assets.find(
        (a) => a.id === overAssetId && a.type === category
      );

      if (!activeItem || !overItem) {
        error("Could not find dragged items", {
          activeAssetId,
          overAssetId,
          category,
        });
        return;
      }

      const categoryAssets = assets
        .filter((a) => a.type === category && a.isInCv)
        .sort((a, b) => (a.position || 0) - (b.position || 0));

      const activeIndex = categoryAssets.findIndex(
        (a) => a.id === activeAssetId
      );
      const overIndex = categoryAssets.findIndex((a) => a.id === overAssetId);

      if (activeIndex === -1 || overIndex === -1) {
        error("Could not find indices for drag operation", {
          activeIndex,
          overIndex,
        });
        return;
      }

      // Reorder the array
      log("Reordering assets:", categoryAssets);
      const reordered = arrayMove(categoryAssets, activeIndex, overIndex);
      log("Reordered assets:", reordered);
      // Update state with new positions using shared helper
      const finalAssets = inferPositionFromArrayIndex(
        reordered,
        category,
        assets
      );

      setAssets(finalAssets);
      // Persist to DB
      await handleUpdatePositions(category, finalAssets);
    } catch (err) {
      error("Error during drag operation:", err);
    }
  };

  if (loadingCvs || loading) return <LoadingSpinner />;

  if (!currentCv) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            CV Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const categoryLabels: Record<AssetType, string> = {
    education: "Education",
    experience: "Experience",
    profession: "Profession",
    techskills: "Tech Skills",
    softskills: "Soft Skills",
    summaries: "Summaries",
    languageskills: "Language Skills",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage CV Assets
              </h1>
              <p className="text-gray-600 mt-1">
                CV: {currentCv.title || `CV #${currentCv.id}`}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-6">
            Drag to reorder assets in the CV. Click Add/Remove to include or
            exclude assets.
          </p>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-8">
              {Object.entries(groupedAssets).map(([category, items]) => {
                const categoryType = category as AssetType;
                const inCvAssets = items.filter((a) => a.isInCv);
                const outOfCvAssets = items.filter((a) => !a.isInCv);

                return (
                  <AssetCategoryList
                    key={category}
                    category={categoryType}
                    categoryLabel={categoryLabels[categoryType]}
                    inCvAssets={inCvAssets}
                    outOfCvAssets={outOfCvAssets}
                    updating={updating}
                    onToggle={toggleAssetInCv}
                  />
                );
              })}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
