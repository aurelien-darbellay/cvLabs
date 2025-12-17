import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import type { AssetEditMode, AssetType } from "@/types/assets";
import { isAssetType } from "@/types/assets";
import type { AssetTableSelection } from "@/components/dashboard/assetTable/AssetTable";
import { saveAsset } from "@/services/assets/saveAsset";
import { deleteAsset } from "@/services/assets/deleteAsset";
import { updateAssetsState } from "./updateAssetsState";
import { getLangCode } from "@/components/dashboard/assetTable/formatters";
import deleteAssetInState from "./deleteAssetInState";

interface ManageAssetsState {
  assets?: any[];
}

export function useManageAssets() {
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

  const closeModal = () => setSelected(null);

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
      if (data.mode === "translation")
        data.values.domainId = data.translation?.domainId;
      const saved = await saveAsset({
        assetType,
        mode: data.mode,
        assetId,
        values: data.values,
      });
      console.log("Asset saved", saved);
      setAssets((prev) => updateAssetsState(prev, saved, data));
      closeModal();
    } catch (error) {
      console.error("Error saving asset", error);
    }
  };

  const handleDelete = async (data: {
    mode: AssetEditMode;
    asset: any;
    translation?: any | null;
  }) => {
    if (assetType === null) {
      console.error("Cannot delete asset: unknown asset type");
      return;
    }

    try {
      if (data.mode === "base") {
        const id = data.asset?.id;
        if (id == null) {
          console.error("Cannot delete asset without an id");
          return;
        }
        await deleteAsset({ assetType, mode: "base", assetId: id });
        setAssets((prev) =>
          deleteAssetInState(prev, { mode: "base", asset: data.asset })
        );
      } else {
        const langCode = getLangCode(data.translation);
        const domainId =
          data.translation?.domainId ??
          data.translation?.domain_id ??
          data.asset?.id ??
          null;

        if (!langCode) {
          console.error("Cannot delete translation without a language code");
          return;
        }
        if (domainId == null) {
          console.error("Cannot delete translation without a domain id");
          return;
        }

        await deleteAsset({
          assetType,
          mode: "translation",
          assetId: domainId,
          translation: data.translation,
        });

        setAssets((prev) =>
          deleteAssetInState(prev, {
            mode: "translation",
            asset: data.asset,
            translation: data.translation,
          })
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error deleting asset", error);
    }
  };

  const hasState = Array.isArray(state.assets);
  const navigateBack = () => navigate(-1);
  const navigateHome = () => navigate("/");

  return {
    assetType,
    hasState,
    assets,
    selected,
    handleRowClick,
    handleSave,
    handleDelete,
    closeModal,
    navigateBack,
    navigateHome,
  };
}
