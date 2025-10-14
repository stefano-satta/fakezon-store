import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../components/common/navbar/navbar';
import {Toast} from 'primeng/toast';
import {Footer} from '../../components/common/footer/footer';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, Navbar, Toast, Footer],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.scss'
})
export class BaseLayout {

}
