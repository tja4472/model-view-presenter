import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Customer } from '../../customer';
import { CheckoutPresenter } from './checkout.presenter';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  viewProviders: [CheckoutPresenter],
})
export class CheckoutComponent {
  @Output()
  checkout = new EventEmitter<Customer>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(
    private presenter: CheckoutPresenter,
  ) {}

  onSubmit() {
    const customerData = this.presenter.checkout();
    this.checkout.emit(customerData);
  }
}
