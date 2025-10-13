import {Component, inject, input} from '@angular/core';
import {Carousel, CarouselResponsiveOptions} from 'primeng/carousel';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '@angular/common';
import {Icon} from '../icon/icon';
import {ICON} from '../../../../utils/icon';
import {CartService} from '../../../services/cart-service';

@Component({
  selector: 'app-custom-products-carousel',
  imports: [
    Carousel,
    Button,
    CurrencyPipe,
    Icon
  ],
  templateUrl: './custom-products-carousel.html',
  styleUrl: './custom-products-carousel.scss'
})
export class CustomProductsCarousel {
  items = input.required<Product[]>();
  numberOfItems = input<number>(3);
  circularCarousel = input<boolean>(false);
  responsiveOptions = input<CarouselResponsiveOptions[]>();
  protected readonly ICON = ICON;
  protected cartService = inject(CartService);

  addProductToCart(product: Product) {
    this.cartService.addProduct(product);
  }

}
