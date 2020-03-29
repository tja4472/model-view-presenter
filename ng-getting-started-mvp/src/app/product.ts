export interface Product {
  readonly description: string;
  readonly name: string;
  readonly price: number;
}

export type Products = ReadonlyArray<Product>;
