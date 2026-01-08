import { AssetType } from "@/types/assets";

interface AssetItem {
  id: number;
  title: string;
  subtitle?: string;
  position?: number;
  relationId?: number;
  isInCv: boolean;
  type: AssetType;
}

export default AssetItem;
