import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Customer } from '../../customer';

@Injectable()
export class CheckoutPresenter {
  form = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  checkout(): Customer {
    const customerData: Customer = this.form.value;
    this.form.reset();

    return customerData;
  }
}
