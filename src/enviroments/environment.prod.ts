import {baseEnvironment} from './base-environment';

export const environment = Object.assign({}, baseEnvironment, {
  production: true,
  baseUrl: 'https://fakestoreapi.com'
});
