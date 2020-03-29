export interface Shipping {
  readonly price: number;
  readonly type: string;
}

export type ShippingOptions = ReadonlyArray<Shipping>;
