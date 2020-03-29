import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { ShippingOptions } from '../shipping';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ReadonlyArray<Product> = [];

  constructor(
    private http: HttpClient,
  ) {}

  addToCart(product: Product): void {
    this.items = [...this.items, product];
  }

  getItems(): ReadonlyArray<Product> {
    return this.items;
  }

  clearCart(): ReadonlyArray<Product> {
    this.items = [];

    return this.items;
  }

  getShippingPrices(): Observable<ShippingOptions> {
    return this.http.get('/assets/shipping.json') as any;
  }
}
