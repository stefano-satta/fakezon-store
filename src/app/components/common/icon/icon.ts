import {Component, input, OnInit} from '@angular/core';


type IconType = 'sm' | 'md' | 'lg' | 'xl';


@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon implements OnInit {
  name = input.required<string>();
  iconSize = input<IconType>('sm');

  ngOnInit() {
  }

  defaultIconSize(): string {
    switch (this.iconSize()) {
      case 'sm':
        return `font-size: 1rem`;
      case 'md':
        return `font-size: 1.5rem`;
      case 'lg':
        return `font-size: 2rem`;
      case 'xl':
        return `font-size: 2.5rem`;
      default:
        return `font-size: 1rem`;
    }
  }
}
