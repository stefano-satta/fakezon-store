import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../components/common/navbar/navbar';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, Navbar, Toast],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.scss'
})
export class BaseLayout {

}
