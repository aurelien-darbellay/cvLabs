import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCvs } from "@/hooks/useCvs";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { supabase } from "@/lib/supabaseClient";
import { AssetType } from "@/types/assets";
import tableMap from "@/types/relationTables";
import AssetItem from "@/pages/manage-cv-assets/AssetItem";
import useCvAssets from "./manage-cv-assets/useCvAssets";
import { assetServiceRegistry } from "@/services/assets/serviceRegistry";
import { PositionCvRelationService } from "@/services/base/CvRelationService";
import normalizeValues from "@/utils/normalizeValues";
import { error } from "@/utils/Log";
import { sortGroupedAsset } from "./manage-cv-assets/sortGroupedAsset";

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
        // Remove from CV
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

  // Group assets by category
  const groupedAssets = assets.reduce((acc, asset) => {
    if (!acc[asset.type]) {
      acc[asset.type] = [];
    }
    acc[asset.type].push(asset);
    return acc;
  }, {} as Record<AssetType, AssetItem[]>);

  for (let category in groupedAssets) {
    groupedAssets[category as AssetType].sort(sortGroupedAsset);
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
            Toggle assets to include or exclude them from this CV
          </p>

          <div className="space-y-8">
            {Object.entries(groupedAssets).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                  {categoryLabels[category as AssetType]}
                </h2>
                <div className="space-y-2">
                  {items.map((asset) => (
                    <div
                      key={`${asset.type}-${asset.id}`}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {asset.title}
                        </p>
                        {asset.subtitle && (
                          <p className="text-sm text-gray-500">
                            {asset.subtitle}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleAssetInCv(asset)}
                        disabled={updating === asset.id}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          asset.isInCv
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {updating === asset.id
                          ? "..."
                          : asset.isInCv
                          ? "Remove"
                          : "Add"}
                      </button>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      No {categoryLabels[category as AssetType].toLowerCase()}{" "}
                      available
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
