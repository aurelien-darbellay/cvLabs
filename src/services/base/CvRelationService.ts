import { Asset } from "@/domain/Asset";
import { supabase } from "@/lib/supabaseClient";

type CvRelationOptions = {
  orderByPosition?: boolean;
};

// Common fields shared by all cv_* relation rows
export interface AssetCVRelation {
  id: number;
  ownerId: string;
  cv_id: number;
  visible: boolean;
  domain_id: number;
}

export class CvRelationService<
  R extends AssetCVRelation,
  T extends { id: string | number }
> {
  protected tableName: string;
  public domainIdField: keyof R;
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
    return (data ?? []) as R[];
  }

  protected filterAssetsInCV(
    assets: Asset<any>[],
    relations: R[]
  ): Asset<any>[] {
    return assets.filter((asset) => {
      return relations.some(
        (relation) => relation[this.domainIdField] === asset.id
      );
    });
  }

  protected filterTranslationsInCV(
    assets: Asset<any>[],
    langCode: string
  ): Asset<any>[] {
    return assets.map((asset) => {
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
    });
  }

  protected sortAssets(assets: Asset<any>[]): Asset<any>[] {
    return assets;
  }

  async getAssetsForCv(
    cvId: number,
    assets: Asset<any>[],
    langCode?: string
  ): Promise<T[]> {
    const assetsInCv = await this.getAssetsInCV(cvId);
    if (assetsInCv.length === 0) {
      return [];
    }
    let filtered = this.filterAssetsInCV(assets, assetsInCv);
    if (langCode) {
      filtered = this.filterTranslationsInCV(filtered, langCode);
    }
    filtered = this.sortAssets(filtered);
    return filtered.map((asset) => (asset as any).prepForCv() as T);
  }

  async addAssetToCv(payload: R): Promise<R> {
    const normalizedPayload: Partial<R> & { [key: string]: any } = {
      ...payload,
      [this.domainIdField]: payload.domain_id,
    };
    delete normalizedPayload.domain_id;
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(normalizedPayload)
      .select()
      .single();

    if (error) throw error;
    return data as R;
  }

  /**
   * Remove an asset from a CV by deleting the relation entry.
   * @param cvId - The CV ID
   * @param assetId - The asset ID (e.g., education_id, experience_id)
   */
  async removeAssetFromCv(cvId: number, assetId: number): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq("cv_id", cvId)
      .eq(this.domainIdField as string, assetId);

    if (error) throw error;
  }
}

