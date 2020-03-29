import { Component, HostBinding, Input } from '@angular/core';

import { Product } from '../../product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input()
  item: Product;

  @HostBinding('class')
  className = 'cart-item';
}
