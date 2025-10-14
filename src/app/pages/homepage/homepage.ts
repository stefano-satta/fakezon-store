import {
  Component,
  computed,
  inject,
  OnInit, signal,
} from '@angular/core';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductService} from '../../services/product-service';
import {CustomProductsCarousel} from '../../components/common/custom-products-carousel/custom-products-carousel';
import {Categories} from '../../components/common/categories/categories';
import {CopyClipboard} from '../../directive/copy-clipboard';
import {Popover} from 'primeng/popover';


@Component({
  selector: 'app-homepage',
  imports: [
    Button,
    TranslatePipe,
    CustomProductsCarousel,
    Categories,
    CopyClipboard,
    Popover
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit {
  private readonly productService = inject(ProductService);
  protected readonly productForSlider = computed(() => this.productService.allProducts().slice(0, 6));
  protected msgDiscountPopover = signal<string>('');
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit() {
  }

  notifyMsgDiscountPopover(text: string) {
    this.msgDiscountPopover.set(text);
  }
}
