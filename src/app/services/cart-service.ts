import {inject, Injectable, OnInit, signal} from '@angular/core';
import {AbstractHttpService} from './abstract-http';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService extends AbstractHttpService implements OnInit {
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  totalToPayCart = signal<number>(0);

  //cart = computed(() => this.productService.allProducts().slice(0,10))
  cart = signal<Product[]>([]);

  ngOnInit() {
    console.log('service cart', this.cart());
  }

  getCart() {
    const url = this.buildApiUrl(environment.api.GET_CART, {id: 2});
    return this.http.get<Cart>(url);
  }

  addProduct(product: Product) {
    // TODO
    const alreadyInTheCart = this.cart().some(cart => cart.id === product.id);
    let updatedCart: Product[] = [];
    if (alreadyInTheCart) {
      console.log('dentro cart')
      updatedCart = this.cart().map((prod: Product) => {
        return (prod.id === product.id) ? {...prod, quantity: Number(prod.quantity! + 1)} : prod;
      })

      this.cart.set(updatedCart);
    } else {
      this.cart.update(prevCart => [...prevCart, product]);
    }

    this.messageService.add({severity: 'info', summary: 'Info', detail: this.translateService.instant('cart.added_to_cart')});
    console.log(this.cart());
  }

  removeProduct(idProduct: number) {
    this.cart.update(prevCart => prevCart.filter(product => product.id !== idProduct));
    this.totalToPay();
    console.log(this.cart());
  }

  changeQuantityProductById(idProduct: number, qty: number) {
    this.cart.update(prevCart => prevCart.map(product => {
      return product.id === idProduct ? {...product, quantity: qty} : product
    }));
    this.totalToPay();
  }

  totalToPay() {
    this.totalToPayCart.set(
      this.cart().reduce((sum, item) => (sum + item.price * item.quantity!), 0)
    );
  }
}
