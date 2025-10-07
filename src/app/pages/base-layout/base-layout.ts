import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../components/common/navbar/navbar';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.scss'
})
export class BaseLayout {

}
