export abstract class Asset<TInCv> {
  /** Map domain model into its CV representation */
  abstract prepForCv(): TInCv;
  /** Build domain model from raw row */
}
