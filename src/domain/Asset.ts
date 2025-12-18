export abstract class Asset<TInCv> {
  public id: number | string;
  constructor(id: number | string) {
    this.id = id;
  }
  /** Map domain model into its CV representation */
  abstract prepForCv(): TInCv;
  /** Build domain model from raw row */
}
