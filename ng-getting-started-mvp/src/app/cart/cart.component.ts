import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Customer } from '../customer';
import { Products } from '../product';

@Component({
  selector: 'app-cart-ui',
  styleUrls: ['./cart.component.css'],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input()
  items: Products;
  @Input()
  shippingPath: string;
  @Output()
  checkout = new EventEmitter<Customer>();
}
