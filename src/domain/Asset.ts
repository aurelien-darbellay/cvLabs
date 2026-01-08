export abstract class Asset<TInCv> {
  public id: number | string;
  constructor(id: number | string) {
    this.id = id;
  }
  /** Map domain model into its CV representation */
  abstract prepForCv(): TInCv;
  /** Build domain model from raw row */
}

export abstract class PositionnedAsset<TInCv> extends Asset<TInCv> {
  public position: number | null;
  constructor(id: number | string, position: number | null) {
    super(id);
    this.position = position;
  }
}
