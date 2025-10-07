import {baseEnvironment} from './base-environment';

export const environment = Object.assign({}, baseEnvironment, {
  production: false,
  baseUrl: 'https://fakestoreapi.com'
});
