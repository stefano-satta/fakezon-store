import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductService} from './services/product-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
