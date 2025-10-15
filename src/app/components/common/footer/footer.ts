import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  protected readonly logo = environment.app.title;

}
