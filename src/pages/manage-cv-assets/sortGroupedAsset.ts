import AssetItem from "./AssetItem";

export function sortGroupedAsset(a: AssetItem, b: AssetItem): number {
  if (a.isInCv && !b.isInCv) return -1;
  else if (b.isInCv && !a.isInCv) return 1;
  else if (b.isInCv && a.isInCv) return (a.position ?? 0) - (b.position ?? 0);
  else return 0;
}
