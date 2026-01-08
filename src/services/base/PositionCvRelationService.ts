import { Asset, PositionnedAsset } from "@/domain/Asset";
import { supabase } from "@/lib/supabaseClient";
import {
  AssetCVRelation,
  CvRelationService,
} from "@/services/base/CvRelationService";

export interface PositionnedAssetCVRelation extends AssetCVRelation {
  id: number;
  ownerId: string;
  cv_id: number;
  visible: boolean;
  domain_id: number;
  position: number;
}

export class PositionCvRelationService<
  R extends PositionnedAssetCVRelation,
  T extends { id: string | number }
> extends CvRelationService<R, T> {
  constructor(tableName: string, domainIdField: keyof R) {
    super(tableName, domainIdField, { orderByPosition: true });
  }

  protected filterAssetsInCV(
    assets: Asset<any>[],
    relations: R[]
  ): Asset<any>[] {
    return assets.reduce<PositionnedAsset<any>[]>((acc, asset) => {
      const relation = relations.find(
        (relation) => relation[this.domainIdField] === asset.id
      );
      if (!relation) return acc;
      const clonedAsset = Object.assign(
        Object.create(Object.getPrototypeOf(asset)),
        asset,
        { position: relation.position }
      ) as PositionnedAsset<any>;
      acc.push(clonedAsset);
      return acc;
    }, []);
  }

  protected sortAssets(assets: Asset<any>[]): Asset<any>[] {
    return assets.sort((a, b) => {
      const posA = (a as PositionnedAsset<any>).position ?? 0;
      const posB = (b as PositionnedAsset<any>).position ?? 0;
      return posA - posB;
    });
  }

  async getLastPosition(cvIdNum: number): Promise<number> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("position")
      .eq("cv_id", cvIdNum)
      .order("position", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data?.[0]?.position ?? 0;
  }

  async updatePositions(
    updates: { relation_id: number; position: number }[]
  ): Promise<{ id: number; position: number }[]> {
    const { data, error } = await supabase.rpc("bulk_positions_update", {
      _table: this.tableName,
      _updates: updates,
    });
    if (error) throw error;
    return data ?? [];
  }
}
