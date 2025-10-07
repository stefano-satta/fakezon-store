import {Injectable, signal} from '@angular/core';
import {AbstractHttpService} from './abstract-http';
import {environment} from '../../enviroments/enviroment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractHttpService {
  allProducts = signal<Product[]>([]);

  getAllProducts(): Observable<Product[]> {
    const url = this.buildApiUrl(environment.api.GET_ALL_PRODUCTS);
    return this.http.get<Product[]>(url);
  }

  getProductByID(id: number): Observable<Product> {
    const url = this.buildApiUrl(environment.api.GET_PRODUCT_BY_ID, {id});
    return this.http.get<Product>(url);
  }
}
