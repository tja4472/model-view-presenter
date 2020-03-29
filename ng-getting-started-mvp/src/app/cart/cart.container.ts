import { Component } from '@angular/core';

import { Customer } from '../customer';
import { pathPrefix, routes } from '../root-routes';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.container.html',
})
export class CartContainerComponent {
  items = this.cartService.getItems();
  shippingPath = pathPrefix + routes.shipping.path;

  constructor(
    private cartService: CartService,
  ) {}

  onCheckout(customerData: Customer) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
  }
}
