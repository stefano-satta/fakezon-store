import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, noop, Observable} from 'rxjs';
import {environment as env} from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AbstractHttpService {
  protected http = inject(HttpClient);

  protected constructor() {
  }

  apiComposed(api: string, params?: {[key: string]: any}) {
    if (params) {
      Object.keys(params).forEach(key => api = api.replace(`:${key}`, params[key]));
    }
    return api;
  }

  protected buildApiUrl(api: string, params?: {[key: string]: unknown}, base?: string) {
    !base ? base = env.baseUrl : noop();
    return base + this.apiComposed(api, params);

  }

  protected pipeResponse(observable: Observable<any>, mapFn: (res: unknown) => {} = async (res) => res) {
    return observable.pipe(
      map(mapFn),
      /*catchError(this.handleHttpError())*/
    );
  }
}
