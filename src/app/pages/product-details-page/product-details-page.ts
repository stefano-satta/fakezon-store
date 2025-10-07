import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink,} from '@angular/router';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-product-details-page',
  imports: [],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss'
})
export class ProductDetailsPage implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  paramsProductID = signal<number>(0);
  productService = inject(ProductService);
  product = signal<Product | null>(null);

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (!params['id']) {
        this.router.navigate(['/']);
      }

      this.getProductDetails(params['id']);
    });
  }

  getProductDetails(id: number) {
    this.productService.getProductByID(id).subscribe(product => {
      console.log('product api ', product);
      if (!product) {
        this.router.navigate(['/']);
      }
      this.product.set(product);
    })
  }
}
