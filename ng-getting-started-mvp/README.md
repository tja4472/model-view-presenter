## Horizontal layers of a web application.

| Horizontal layer | Examples                                                                               |
| ---------------- | -------------------------------------------------------------------------------------- |
| Business logic   | Application-specific logic, domain logic, validation rules                             |
| Persistence      | WebStorage, IndexedDB, WebSQL, HTTP, WebSocket, GraphQL, Firebase, Meteor              |
| Messaging        | WebRTC, WebSocket, Push API, Server-Sent Events                                        |
| I/O              | Web Bluetooth, WebUSB, NFC, camera, microphone, proximity sensor, ambient light sensor |
| Presentation     | DOM manipulation, event listeners, formatting                                          |
| User interaction | UI behaviour, form validation                                                          |
| State management | Application state management, application-specific events                              |

## Separated concerns

### CartContainerComponent(cart.container.ts)

1. selector: 'app-cart'
1. State management, details
1. Business logic, low level

### CartComponent(cart.component.ts)

1. selector: 'app-cart-ui'
1. Presentation, high level
1. Presentation, low level
1. Business logic, high level

### CartItemComponent(cart-item.component.ts)

1. selector: 'app-cart-item'
1. Presentation, high level
1. Presentation, low level

### CheckoutComponent(checkout.component.ts)

1. selector: 'app-checkout'
1. Presentation, high level
1. User interaction, high level

### CheckoutPresenter(checkout.presenter.ts)

1. User interaction, low level

## References

### Lars Gyrup Brink Nielsen

- https://admin.indepth.dev/author/layzee/
- [Lean Angular components](https://admin.indepth.dev/lean-angular-components/)
- [Horizontal layers of a web application](https://gist.github.com/LayZeeDK/e8a312917af9810637dd1330a7ee768c#file-web-application-horizontal-layers-csv)
- https://indepth.dev/model-view-presenter-with-angular/
