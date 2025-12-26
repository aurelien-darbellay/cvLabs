import { AssetType } from "@/types/assets";

interface AssetItem {
  id: number;
  title: string;
  subtitle?: string;
  isInCv: boolean;
  type: AssetType;
}

export default AssetItem;
