import { Asset } from "@/domain/Asset";
import { supabase } from "@/lib/supabaseClient";

type CvRelationOptions = {
  orderByPosition?: boolean;
};

// Common fields shared by all cv_* relation rows
export interface AssetCVRelation {
  id: number;
  owner_id: string;
  cv_id: number;
  position: number;
  visible: boolean;
}

export class CvRelationService<
  R extends AssetCVRelation,
  T extends { id: string | number }
> {
  protected tableName: string;
  protected domainIdField: keyof R;
  private readonly orderByPosition: boolean;

  constructor(
    tableName: string,
    domainIdField: keyof R,
    options: CvRelationOptions = {}
  ) {
    this.tableName = tableName;
    this.domainIdField = domainIdField;
    this.orderByPosition = options.orderByPosition ?? true;
  }

  /**
   * Generic fetcher for cv_* relation rows by CV id.
   * Filters visible rows and orders by position ascending.
   */
  async getAssetsInCV(cvId: number): Promise<R[]> {
    const query = supabase
      .from(this.tableName)
      .select("*")
      .eq("cv_id", cvId)
      .eq("visible", true);

    if (this.orderByPosition) {
      query.order("position", { ascending: true });
    }

    const { data, error } = await query;

    if (error) throw error;
    /* console.log(
      `Fetched relations from ${this.tableName} for CV ${cvId}:`,
      data
    ); */
    return (data ?? []) as R[];
  }

  async getAssetsForCv(
    cvId: number,
    assets: Asset<any>[],
    langCode?: string
  ): Promise<T[]> {
    if (this.domainIdField == "softskill_id")
      console.log("Getting soft skills for CV:", cvId, assets, langCode);
    const assetsInCv = await this.getAssetsInCV(cvId);
    if (assetsInCv.length === 0) {
      return [];
    }

    // Filter assets by matching their id with the relation's domain id field
    const filtered = assets.filter((asset) => {
      return assetsInCv.some(
        (relation) => relation[this.domainIdField] === asset.id
      );
    });

    // If language specified, optionally filter translation fields
    // (assumes assets may have translatedFields or similar structure)
    if (langCode) {
      const twiceFiltered = filtered
        .map((asset) => {
          if (
            asset &&
            typeof asset === "object" &&
            "translatedFields" in asset &&
            Array.isArray((asset as any).translatedFields)
          ) {
            asset.translatedFields = (asset as any).translatedFields.filter(
              (tf: any) => tf.langCode === langCode
            );
          }
          return asset;
        })
        .map((asset) => (asset as any).prepForCv() as T);

      return twiceFiltered;
    }

    return filtered.map((asset) => (asset as any).prepForCv() as T);
  }
}
