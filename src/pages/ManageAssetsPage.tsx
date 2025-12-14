import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  AssetTable,
  type AssetTableSelection,
} from "@/components/dashboard/assetTable/AssetTable";
import { EditAssetModal } from "@/components/dashboard/EditAssetModal";
import { saveAsset } from "@/services/assets/saveAsset";
import { assetTypeLabels, isAssetType, type AssetType } from "@/types/assets";
import { updateAssetsState } from "@/components/dashboard/helpers/updateAssetsState";
import type { AssetEditMode } from "@/types/assets";

interface ManageAssetsState {
  assets?: any[];
}

export default function ManageAssetsPage() {
  const navigate = useNavigate();
  const { assetType: assetTypeParam } = useParams();
  const location = useLocation();
  const state = (location.state as ManageAssetsState) || {};

  const assetType = useMemo<AssetType | null>(() => {
    if (assetTypeParam && isAssetType(assetTypeParam)) {
      return assetTypeParam;
    }
    return null;
  }, [assetTypeParam]);

  const [selected, setSelected] = useState<AssetTableSelection | null>(null);
  const [assets, setAssets] = useState<any[]>(state.assets ?? []);

  const handleRowClick = (selection: AssetTableSelection) => {
    setSelected(selection);
  };

  const handleSave = async (data: {
    mode: AssetEditMode;
    values: Record<string, any>;
    asset: any;
    translation?: any | null;
  }) => {
    if (assetType === null) {
      console.error("Cannot save asset: unknown asset type");
      return;
    }
    try {
      const assetId =
        data.mode === "base"
          ? data.asset?.id ?? null
          : data.translation?.id ?? null;
      const saved = await saveAsset({
        assetType,
        mode: data.mode,
        assetId,
        values: data.values,
      });
      setAssets((prev) => updateAssetsState(prev, saved, data));
      closeModal();
    } catch (error) {
      console.error("Error saving asset", error);
    }
  };

  const closeModal = () => setSelected(null);

  if (!assetType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-3 text-center">
          <p className="text-lg font-semibold text-gray-900">
            Unknown asset type
          </p>
          <p className="text-sm text-gray-600">
            Please navigate from the dashboard to manage assets.
          </p>
          <button
            className="mt-2 px-4 py-2 rounded-md bg-indigo-600 text-white"
            onClick={() => navigate("/")}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const hasState = Array.isArray(state.assets);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase text-gray-500 font-semibold">
              Manage assets
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              {assetTypeLabels[assetType]}
            </h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        {!hasState ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 text-gray-700 space-y-3">
            <p className="font-semibold text-gray-900">No asset data found.</p>
            <p className="text-sm">
              Open this page from the dashboard to reuse the data already
              fetched there.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white"
            >
              Go to dashboard
            </button>
          </div>
        ) : (
          <AssetTable
            assetType={assetType}
            assets={assets}
            onRowClick={handleRowClick}
          />
        )}
      </div>

      <EditAssetModal
        isOpen={!!selected}
        assetType={assetType}
        asset={selected?.asset ?? null}
        translation={selected?.translation ?? null}
        mode={selected?.mode ?? "base"}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
